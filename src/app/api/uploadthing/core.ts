import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { UTApi } from "uploadthing/server";
import { z } from "zod";

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

      // metadata is passed to the onUploadComplete function
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
        if (oldUserData?.profilePictureKey) {
          await utapi.deleteFiles(oldUserData.profilePictureKey);
        }
      } catch (e) {
        console.error(e);
      }
    }),

  projectImageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ projectId: z.string() })) // pass the projectId to the middleware
    .middleware(async ({ req, input }) => {
      const { userId } = auth();

      if (!userId) {
        throw new Error("You must be logged in to upload files");
      }

      // Todo check if user is a member of the project they are trying to upload to
      // Todo validate the image has the correct dimensions and resolution

      return input;
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Add the file to the database
      const { projectId } = metadata;

      try {
        // Get the original project record so that we can delete the old profile image if it exists
        const oldProjectData = await prisma.project.findUnique({
          where: { id: projectId },
        });

        // Update the project record with the new profile image
        await prisma.project.update({
          where: { id: projectId },
          data: {
            projectPictureUrl: file.url,
            projectPictureKey: file.key,
          },
        });

        // Delete the old picture from uploadthing if it exists
        if (oldProjectData?.projectPictureKey) {
          await utapi.deleteFiles(oldProjectData.projectPictureKey);
        }
      } catch (e) {
        console.error(e);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
