// Validate that the user is allowed to create an account
// If the user is allowed to create an account, create the account

import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

export async function GET(req: Request) {
  const res = await fetch("https://api.github.com/users/vercel");
  //   return res.json();
  return NextResponse.json({ user: "Aidan" }, { status: 200 });
}
