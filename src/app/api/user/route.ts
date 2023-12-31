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
export async function GET(request: NextRequest): Promise<NextResponse<User[]>> {
  // Use a query parameter to also get all of the projects for all of the users
  // if projects=true, then also get all of the projects for all of the users (this is the default)
  // if projects=false, then do not get all of the projects for all of the users

  const searchParams = request.nextUrl.searchParams;
  const projects = searchParams.get("projects");

  // The users to return
  let users: User[];

  // Get all users without their projects
  if (projects === "false") {
    users = await prisma.user.findMany();
  } else {
    // Get all users including their projects
    users = await prisma.user.findMany({
      include: {
        projects: true,
        leading: true,
      },
    });
  }

  // Return the users
  return NextResponse.json(users, { status: 200 });
}
