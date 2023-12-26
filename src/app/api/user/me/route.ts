import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, User } from "@prisma/client";
import { auth } from "@clerk/nextjs";
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/user/me:
 *  get:
 *   description: Returns the current user
 *
 */
export async function GET(
  request: NextRequest,
): Promise<NextResponse<User | null>> {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(null, {
      status: 400,
    });
  }

  // Get the current user
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      projects: true,
      leading: true,
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
