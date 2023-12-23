import React, { use, useState } from "react";
import ProjectFlagsCard from "./project-manager/ProjectFlagsCard";
import MemberChips from "./project-manager/MemberChips";
import { SearchBar } from "./project-manager/searchbar/SearchBar";
import { SearchResultsList } from "./project-manager/searchbar/SearchResultList";
import { SaveAdd } from "./project-manager/searchbar/SaveAdd";
import { set } from "zod";
import { useEffect } from "react";
import { Project } from "@prisma/client";
import { UserMinimized, usersMinimizer } from "@/utils/helpers";
import { AdminProvider } from "./adminContext";

type ProjectSectionProps = {
  project: Project;
  users: UserMinimized[];
};

export const ProjectSection: React.FC<ProjectSectionProps> = ({
  project,
  users,
}) => {
  return (
    <AdminProvider members={usersMinimizer(project.members)}>
      {project && users ? (
        <div className="flex">
          <div>
            <ul className="space-y-2">
              <li className="flex">
                <ProjectFlagsCard tags={["static", "temp", "tags"]} />
              </li>
              <li>Project created at {project.createdAt.toString()}</li>
              <li>Project updated at {project.updatedAt.toString()}</li>
              <li>Other information</li>
              <br />
            </ul>
          </div>
          <div className="mx-3"></div>
          <div>
            <MemberChips />
            <SearchBar items={users} />
            <SearchResultsList />
            <SaveAdd />
          </div>
        </div>
      ) : (
        <h1>null</h1>
      )}
    </AdminProvider>
  );
};
