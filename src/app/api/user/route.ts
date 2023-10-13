// /api/user route
// Should only be used for post requests to create a new user
// All other requests should be made to /api/user/[id]
import { NextResponse, NextRequest } from "next/server";

// Todo sample request to show how the route handler works, delete later
/**
 * @swagger
 * /api/user:
 *   get:
 *     description: Returns the current user
 *     parameters:
 *      - in: path
 *        name: name
 *        required: true
 *     responses:
 *       200:
 *         description: Success, user exists
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 */
export async function GET() {
  const sampleUser = {
    name: "John Doe",
  };
  return NextResponse.json({ user: sampleUser }, { status: 200 });
}
