// Home Page
"use client";
import React from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignInPrompt from "./sign-in/SignInPrompt";
import ProjectCard from "./components/ProjectCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@prisma/client";

export default function Home() {
  // Because we have multiple queries, we need to rename data and isLoading
  const { data: currentUser, isLoading: userLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await axios.get("/api/user/me");
      return response.data;
    },
  });

  return (
    <div className="container">
      <SignedIn>
        <h1 className="text-2xl font-bold">My Teams</h1>
        <div className=" grid grid-cols-3 gap-5">
          {userLoading ? (
            <h1>loading</h1>
          ) : (
            <div>
              {currentUser.projects.map((project) => (
                <ProjectCard
                  imageUrl={project.projectPictureUrl}
                  projectTitle={project.title}
                />
              ))}
            </div>
          )}
        </div>
      </SignedIn>
      <SignedOut>
        <SignInPrompt />
      </SignedOut>
    </div>
  );
}
