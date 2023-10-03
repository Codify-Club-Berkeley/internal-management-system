// /api/user/[id] route
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = request.id;
  return NextResponse.json({ id: id }, { status: 200 });
}
