import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Meeting, User } from "@prisma/client";
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

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<Meeting | null | any>> {
  
  // TODO: Needs data validation
  const body = await request.json();

  try {
    createMeetingValidator.parse(body);
    const meeting = await prisma.meeting.create({
      data: body,
    });

    return NextResponse.json(meeting, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });  
  }
}