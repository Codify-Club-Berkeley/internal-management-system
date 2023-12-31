"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SignInPrompt() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl">
        Welcome to the Codify Internal Management System
      </h1>
      <br></br>
      <Button
        className="mb-2"
        onPress={() => {
          router.push("/sign-in");
        }}
      >
        Sign In
      </Button>

      <Button
        className="mb-2"
        onPress={() => {
          router.push("/sign-up");
        }}
      >
        Sign Up
      </Button>
    </div>
  );
}
