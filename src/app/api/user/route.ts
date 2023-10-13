import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/user:
 *   get:
 *     description: Returns all users
 *     parameters:
 *      - in: path
 *        name: name
 *        required: true
 *     responses:
 *       200:
 *         description: This schema is not accurate, I am just leaving it here as reference for when I properly fill out the rest of the swagger documentation
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 */
export async function GET(): Promise<NextResponse<User[]>> {
  // Get all users
  const users: User[] = await prisma.user.findMany();

  // Return the users
  return NextResponse.json(users, { status: 200 });
}
