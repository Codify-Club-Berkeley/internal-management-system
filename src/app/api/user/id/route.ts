// /api/user/[id] route

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  // Get the ID from the request
  const userId = request.nextUrl.searchParams.get("id");

  // If the user ID is not provided, return an error
  if (!userId) {
    return NextResponse.error();
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return NextResponse.json(user, { status: 200 });
}
