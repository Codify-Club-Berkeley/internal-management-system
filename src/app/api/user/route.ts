import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, User, Project } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/user:
 *   get:
 *     description: Returns all users
 *     parameters:
 *      - in: path
 *        name: name
 *        required: true
 *     responses:
 *       200:
 *         description: This schema is not accurate, I am just leaving it here as reference for when I properly fill out the rest of the swagger documentation
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 */
export async function GET(
  request: NextRequest,
): Promise<NextResponse<[User, Project[]][]>> {
  // Use a query parameter to also get all of the projects for all of the users
  // if projects=true, then also get all of the projects for all of the users
  // if projects=false, then do not get all of the projects for all of the users (this is the default)
  // Todo returning everything is currently the default, we will have to see over time if it causes performance issues
  const searchParams = request.nextUrl.searchParams;
  const projects = searchParams.get("projects");

  // Get all users
  const users: User[] = await prisma.user.findMany();

  // An array of tuples, where the first element is the user, and the second element is an array of projects
  const usersWithProjects: [User, Project[]][] = [];

  if (true || projects == "true") {
    // Get all of the projects for all of the users
    for (let i = 0; i < users.length; i++) {
      let currentProjects: Project[] | null = await prisma.user
        .findUnique({
          where: {
            id: users[i].id,
          },
        })
        .projects();

      // To appease the typescript gods
      if (!currentProjects) {
        currentProjects = [];
      }
      usersWithProjects.push([users[i], currentProjects]);
    }
  }

  // Return the users
  return NextResponse.json(usersWithProjects, { status: 200 });
}
