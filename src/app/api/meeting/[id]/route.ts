import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Meeting } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<Meeting | null>> {
  // If the identifier starts with meeting_, the it is an ID, otherwise it is a slug

  let meeting: Meeting | null;

  // Get the current meeting by the id
  meeting = await prisma.meeting.findUnique({
    where: {
      id: params.id,
    },
  });

  // If the meeting does not exist, return a 400 error
  if (!meeting) {
    return NextResponse.json(meeting, {
      status: 400,
    });
  }

  // If the user exists, return the user with a 200 status code
  return NextResponse.json(meeting, { status: 200 });
}
