// Validate that the user is allowed to create an account
// If the user is allowed to create an account, create the account

import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/dist/server/api-utils";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // Get the current user
  const { user } = getAuth(req);

  // If not signed in, redirect to sign in page
  if (!user) {
    return NextResponse.redirect("/sign-in");
  }

  // Todo validate that the user has a .berkeley.edu email address
  // const { emailAddress } = user;

  // Check if the user already exists in our database
  const existingUser = prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  // If the user does not exist, create the user
  if (!existingUser) {
    const createdUser = prisma.user.create({
      data: {
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  return NextResponse.json({
    data: user,
  });

  // return NextResponse.redirect(new URL("/roster", req.url).href);
}
