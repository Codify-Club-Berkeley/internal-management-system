import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Meeting } from "@prisma/client";
const prisma = new PrismaClient();

// TODO: Add query parameter to get attendance of users

/**
 * @swagger
 * /api/meeting/{id}:
 *   get:
 *     description: Get a meeting by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the meeting to be retrieved
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: The meeting was successfully retrieved
 *       400:
 *         description: There was a problem with the request
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<Meeting | null | any>> {

  try {
    const meeting = await prisma.meeting.findUnique({
      where: { id: params.id },
    });

    if (!meeting) {
      return NextResponse.json(null, { status: 400 });
    }

    return NextResponse.json(meeting, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 400 });
  }
}


/**
 * @swagger
 * /api/meeting/{id}:
 *   delete:
 *     description: Delete a meeting
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the meeting to be deleted
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The meeting was successfully deleted
 *       400:
 *         description: There was a problem with the request
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<Meeting | null | any>> {

  try {
    const deletedMeeting = await prisma.meeting.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedMeeting, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}

/**
 * @swagger
 * /api/meeting/{id}:
 *   patch:
 *     description: Update an existing meeting
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the meeting to be updated
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: The meeting was successfully updated
 *       400:
 *         description: There was a problem with the request
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<Meeting | null | any>> {
  
  // TODO: Needs data validation
  const body = await request.json();

  try {
    const updatedMeeting = await prisma.meeting.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(updatedMeeting, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, {
      status: 400,
    });
  }
}
