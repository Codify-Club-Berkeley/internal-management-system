import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Project } from "@prisma/client";
import { updateProjectValidator } from "@/lib/validators";
import { z } from "zod";
const prisma = new PrismaClient();

// Todo implement get by id, and put by id

/**
 * @swagger
 * /api/projects/{id}:
 *  get:
 *   description: Get a project by id
 *
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<Project | null>> {
  // Get the current Project
  const project: Project | null = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
  });

  // If the project does not exist, return a 400 error
  if (!project) {
    return NextResponse.json(project, {
      status: 400,
    });
  }

  // If the project exists, return the project with a 200 status code
  return NextResponse.json(project, { status: 200 });
}

/**
 * @swagger
 * /api/projects/{id}:
 *  put:
 *   description: Updates a project
 *
 */

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<Project | null | any>> {
  // Given a project name, a list of userIDs to add, and a list of userIDs to remove
  // Update the project with the given id

  // Only admins or the project owner should be allowed to update the project's data

  const body = await request.json();
  try {
    // Validate the request body
    updateProjectValidator.parse(body);

    // Format the body to be used in the update
    // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#connect-an-existing-record
    const addUsers = body.addUsers
      ? body.addUsers.map((userId: string) => ({ id: userId }))
      : [];

    // Perform the exact same formatting for the removeUsers
    const removeUsers = body.removeUsers
      ? body.removeUsers.map((userId: string) => ({ id: userId }))
      : [];

    // Todo verify that the user is an admin or the project owner

    // Update the project
    const project: Project | null = await prisma.project.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        members: {
          connect: addUsers,
          disconnect: removeUsers,
        },
      },
    });

    // If the project was not updated successfully, return a 400 error
    if (!project) {
      return NextResponse.json(project, {
        status: 400,
      });
    }

    // If the project was updated successfully, return the project with a 200 status code
    return NextResponse.json(project, { status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError)
      return NextResponse.json(error.issues[0], { status: 400 });
    return NextResponse.json(error, { status: 400 });
  }
}
