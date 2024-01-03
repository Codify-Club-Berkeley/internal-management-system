import { NextRequest, NextResponse } from "next/server";

import { PrismaClient, Project, User } from "@prisma/client";

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

  // If minimized=true, then only return the id, firstName, and lastName of each user
  // If minimized=false, then return the entire user object

  //! Using include and select at the same time causes an error within Prisma, we need
  // Todo find a workaround for this
  const searchParams = request.nextUrl.searchParams;
  const projects = searchParams.get("projects");
  const minimized = searchParams.get("minimized");

  // The params to pass into the findMany function
  let params = {};

  if (minimized === "true") {
    params = {
      ...params,
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    };
  }

  if (projects === "true") {
    params = {
      ...params,
      include: {
        projects: true,
        leading: true,
      },
    };
  }

  // Get all users without their projects
  const users = await prisma.user.findMany(params);

  // Return the users
  return NextResponse.json(users, { status: 200 });
}
