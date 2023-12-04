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
export async function POST(
  request: NextRequest,
): Promise<NextResponse<Meeting | null | any>> {
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

/**
 * @swagger
 * /api/meeting:
 *   get:
 *     description: Get all meetings
 *     responses:
 *       200:
 *         description: The meetings were successfully retrieved
 *       400:
 *         description: There was a problem with the request
 */
// Get all meetings, use a query param to filter by project
// Includes the present, absent, and excused users by default
export async function GET(
  request: NextRequest,
): Promise<NextResponse<Meeting[] | null | any>> {
  const searchParams = request.nextUrl.searchParams;
  const projectId = searchParams.get("projectId");

  try {
    let meetings: Meeting[] | null | any;
    if (projectId) {
      meetings = await prisma.meeting.findMany({
        where: {
          projectId: projectId,
        },
        include: {
          present: true,
          absent: true,
          excused: true,
        },
      });
    } else {
      meetings = await prisma.meeting.findMany({
        include: {
          present: true,
          absent: true,
          excused: true,
        },
      });
    }

    return NextResponse.json(meetings, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
