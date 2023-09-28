// Sample NextJS 13 API route to return a user object
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const sampleUser = {
    name: "John Doe",
  };
  return NextResponse.json({ user: sampleUser }, { status: 200 });
}

export async function POST(request: Request) {
  const sampleUser = {
    name: "John Doe",
  };
  console.log(request.body);
  return NextResponse.json({ user: sampleUser }, { status: 200 });
}
