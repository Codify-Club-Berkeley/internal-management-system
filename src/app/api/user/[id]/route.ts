import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, User } from "@prisma/client";
import { updateUserValidator } from "@/lib/validators";
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *   description: Returns the user with the given id if it exists, can also use the profile slug
 *
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<User | null>> {
  // If the identifier starts with user_, the it is an ID, otherwise it is a slug
  const isId = params.id.startsWith("user_");
  let user: User | null;

  if (isId) {
    // Get the current user by the id
    user = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
    });
  } else {
    // Get the current user by the slug
    user = await prisma.user.findUnique({
      where: {
        slug: params.id,
      },
    });
  }

  // If the user does not exist, return a 400 error
  if (!user) {
    return NextResponse.json(user, {
      status: 400,
    });
  }

  // If the user exists, return the user with a 200 status code
  return NextResponse.json(user, { status: 200 });
}

/**
 * @swagger
 * /api/user/{id}:
 *  put:
 *  description: Updates the user with the given id
 *
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<User | null | any>> {
  // Todo add the ability to update a user's roles

  // Todo, add authentication to make sure that the user is allowed to update the user with the given id
  // Only admins or the user themselves should be allowed to update the user's data

  const body = await request.json();

  try {
    // Validate the request body
    updateUserValidator.parse(body);

    // Todo determine if this DB call is necessary
    // Get the current user
    const user: User | null = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
    });

    // If the user does not exist, return a 400 error
    if (!user) {
      return NextResponse.json(user, {
        status: 400,
      });
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: body,
    });

    // Return the updated user
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    // If the user was not updated successfully, return the error with a 400 status code
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
