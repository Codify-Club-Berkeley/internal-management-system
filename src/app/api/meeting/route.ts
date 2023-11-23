import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Meeting } from "@prisma/client";
const prisma = new PrismaClient();
import { createMeetingValidator } from "@/utils/validators";

/**
 * @swagger
 * /api/meeting:
 *   post:
 *     description: Create a new meeting
 *     responses:
 *       200:
 *         description: The meeting was successfully created
 *       400:
 *         description: There was a problem with the request
 */

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
