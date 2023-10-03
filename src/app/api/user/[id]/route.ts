// /api/user/[id] route
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = request.id;
  const user = prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(user, { status: 200 });
}
