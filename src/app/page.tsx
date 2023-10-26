// Home Page
"use client";
import React from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignInPrompt from "./sign-in/SignInPrompt";
import ProjectCard from "./components/ProjectCard";

export default function Home() {
  return (
    <div className="container">
      <SignedIn>
        <h1 className="text-2xl font-bold">My Teams</h1>
        <div className=" grid grid-cols-3 gap-5">
          <ProjectCard
            teamName="Team 1"
            imageUrl="/path-to-image.jpg"
            projectTitle="ims"
          />
        </div>
      </SignedIn>
      <SignedOut>
        <SignInPrompt />
      </SignedOut>
    </div>
  );
}
