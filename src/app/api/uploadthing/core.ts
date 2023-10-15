import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();
const prisma = new PrismaClient();

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  profileImageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const { userId } = auth();

      if (!userId) {
        throw new Error("You must be logged in to upload files");
      }

      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Add the file to the database
      const { userId } = metadata;

      try {
        // Get the original user record so that we can delete the old profile image if it exists
        const oldUserData = await prisma.user.findUnique({
          where: { id: userId },
        });

        // Update the user record with the new profile image
        await prisma.user.update({
          where: { id: userId },
          data: {
            profilePictureUrl: file.url,
            profilePictureKey: file.key,
          },
        });

        // Delete the old profile from uploadthing if it exists
        if (oldUserData.profilePictureKey) {
          await utapi.deleteFiles(oldUserData.profilePictureKey);
        }
      } catch (e) {
        console.error(e);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
