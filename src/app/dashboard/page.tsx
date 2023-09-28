"use client"; // Specifies that this is a client component, not a server component

import React, { use, useEffect } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Page() {
  useEffect(() => {
    // Get all users from database
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data); // This console log will only appear in the browser console
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <div>Sign in</div>
      </SignedOut>
    </div>
  );
}
