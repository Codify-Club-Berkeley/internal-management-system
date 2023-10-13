// Process a user after sign in
// If the user already exists, return the user's slug from their profile
// If the user does not already exist, validate if the user is allowed to create an account
// If the user is allowed to create an account, create the account
// Return either the user's slug, or the string "invalid"

import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/dist/server/api-utils";
import { currentUser } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs";
import { PrismaClient, Profile, User } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

type ValidateResponse = {
  data: string;
};

/**
 * @swagger
 * /api/user/validate:
 *  get:
 *    description: Validates a user's email address from their clerk sign in and creates a user if they are allowed to create an account. Returns the user's slug if successful, or the string "invalid" if unsuccessful
 *    responses:
 *       200:
 *         description: Success, user exists
 */
export async function GET(
  req: NextRequest,
): Promise<NextResponse<ValidateResponse>> {
  // Get the current user
  const user = await currentUser();

  // If not signed in, redirect to sign in page
  if (!user) {
    return NextResponse.json(
      {
        data: "invalid",
      },
      {
        status: 400,
      },
    );
  }

  // Validate that the user has a berkeley.edu email address
  const email = user.emailAddresses[0].emailAddress;
  const emailDomain = email.split("@")[1];

  // Remove the if false statement to enable email validation
  if (false && emailDomain !== "berkeley.edu") {
    return NextResponse.json(
      {
        data: "invalid",
      },
      {
        status: 400,
      },
    );
  }

  // Check if the user already exists in our database
  const existingUser: User | null = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  // If the user exists, get their slug from their profile
  if (existingUser) {
    return NextResponse.json(
      {
        data: existingUser.slug,
      },
      {
        status: 200,
      },
    );
  }

  // Shouldn't ever happen, but just so typescript doesn't complain
  if (!user.firstName || !user.lastName) {
    return NextResponse.json({
      data: "invalid",
    });
  }

  const slug = user.firstName.toLowerCase() + user.lastName.toLowerCase();

  // Create the user
  const createdUser: User = await prisma.user.create({
    data: {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      slug: slug,
    },
  });

  return NextResponse.json(
    {
      data: createdUser.slug,
    },
    {
      status: 400,
    },
  );
}
