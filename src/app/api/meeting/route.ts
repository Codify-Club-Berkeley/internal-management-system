import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Meeting } from "@prisma/client";
const prisma = new PrismaClient();
import { createMeetingValidator } from "@/lib/validators";

export async function POST(request: NextRequest) {
  // Get the body of the request
  const body = await request.json();

  try {
    createMeetingValidator.parse(body);
    const meeting = await prisma.meeting.create({
      data: body,
    });

    return NextResponse.json(meeting, { status: 200 });
  } catch (error) {
    console.log("error");
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
