import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

// Either returns the user with the given id or null if the user does not exist
/**
 * @swagger
 * /api/user/{id}:
 *
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<User | null>> {
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

  // If the user exists, return the user with a 200 status code
  return NextResponse.json(user, { status: 200 });
}

// Updates the user with the given id
/**
 * @swagger
 * /api/user/{id}:
 *
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<User | null>> {
  // Todo set up input validation with zod or valibot

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

  // Get the search params from the request
  const searchParams = request.nextUrl.searchParams;
  let updatedData: any = {};

  // Add all of the search params to the updated data object so it can be passed to the prisma client
  // Looks something like this
  // {
  //   linkedInURL: 'https://www.linkedin.com/in/aidan-sunbury/',
  //   phoneNum: '9254515546'
  // }
  searchParams.forEach((value, key) => {
    updatedData[key] = value;
  });

  // Update the user
  const updatedUser = await prisma.user.update({
    where: {
      id: params.id,
    },
    // https://nextjs.org/docs/app/api-reference/functions/next-request#nexturl
    data: updatedData,
  });

  // Return the updated user
  return NextResponse.json(updatedUser, { status: 200 });
}
