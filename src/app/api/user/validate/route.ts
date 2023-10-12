// Validate that the user is allowed to create an account
// If the user is allowed to create an account, create the account

import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/dist/server/api-utils";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";

export async function GET(req: NextRequest) {
  // Get the current user
  const user = getAuth(req);

  // Return some information about the user
  // return NextResponse.json({
  //   data: user,
  // });
  return NextResponse.json({
    data: user.userId,
  });

  // return NextResponse.redirect(new URL("/roster", req.url).href);
}
