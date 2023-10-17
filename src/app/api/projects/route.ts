import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Project } from "@prisma/client";
import { createProjectValidator } from "@/lib/validators";
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/projects:
 *  post:
 *   description: Creates a new project
 *
 */

export async function POST(
  request: NextRequest,
): Promise<NextResponse<Project | any>> {
  // Todo, add authentication to make sure that the user is allowed create projects
  // Only admins should be allowed to create a new project

  const body = await request.json();
  try {
    // Validate the request body
    createProjectValidator.parse(body);

    // Create the project
    const project: Project | null = await prisma.project.create({
      data: body,
    });

    // If the project was created successfully, return the project with a 200 status code
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    // If the project was not created successfully, return the error with a 400 status code
    // Most likely, the project title already exists
    return NextResponse.json(error, {
      status: 400,
    });
  }
}

/**
 * @swagger
 * /api/projects:
 *  get:
 *   description: Returns all projects
 *
 */
export async function GET(
  request: NextRequest,
): Promise<NextResponse<Project[]>> {
  // Get all projects
  const projects: Project[] = await prisma.project.findMany();

  // If the projects exist, return the projects with a 200 status code
  return NextResponse.json(projects, { status: 200 });
}
