import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";
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
        // todo figure out if we need to store the file key or just the url
        await prisma.user.update({
          where: { id: userId },
          data: {
            linkedInUrl: file.url,
          },
        });

        // todo add error handling and delete the old file
      } catch (e) {
        console.error(e);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
