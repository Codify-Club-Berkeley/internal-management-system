// Home Page
"use client";
import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";
import SignInPrompt from "./sign-in/SignInPrompt";
import ProjectCard from "./components/ProjectCard";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { User } from "@prisma/client";

const handleCardPress = (projectId: unknown) => {
  // Route to the project's specific page
   // idk how to make an API call
  const router = useRouter();
  router.push(`/project/${projectId}`);
};

export default function Home() {
  return (
    <div className="container">
      <SignedIn>
        <h1 className="text-2xl font-bold">My Teams</h1>
        <div className=" grid grid-cols-3 gap-5">
          <ProjectCard
            teamName="Team 1"
            imageUrl="/path-to-image.jpg"
            onPress={() => handleCardPress(1)}
          />
          <ProjectCard
            teamName="Team 2"
            imageUrl="/path-to-image.jpg"
            onPress={() => handleCardPress(2)}
          />
        </div>
      </SignedIn>
      <SignedOut>
        <SignInPrompt />
      </SignedOut>
    </div>
  );
}
