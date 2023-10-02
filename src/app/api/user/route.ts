// /api/user route
// Should only be used for post requests to create a new user
// All other requests should be made to /api/user/[id]
import { NextResponse, NextRequest } from "next/server";

// Todo sample request to show how the route handler works, delete later
export async function GET() {
  const sampleUser = {
    name: "John Doe",
  };
  return NextResponse.json({ user: sampleUser }, { status: 200 });
}

// Todo sample request to show how the route handler works, delete later
// Simply returns the user that was sent in the request body
export async function POST(request: NextRequest) {
  const data = await request.json();
  return NextResponse.json({ data: data }, { status: 200 });
}
