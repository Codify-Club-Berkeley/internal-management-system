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
