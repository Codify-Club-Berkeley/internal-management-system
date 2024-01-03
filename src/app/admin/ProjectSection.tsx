import React, { use, useState } from "react";
import ProjectFlagsCard from "./project-manager/ProjectFlagsCard";
import MemberChips from "./project-manager/MemberChips";
import { SearchBar } from "./project-manager/searchbar/SearchBar";
import { SearchResultsList } from "./project-manager/searchbar/SearchResultList";
import { AddButton } from "./project-manager/searchbar/AddButton";
import { SaveButton } from "./project-manager/searchbar/SaveButton";
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
    <AdminProvider
      members={usersMinimizer(project.members)}
      leads={usersMinimizer(project.leads)}
    >
      {project && users ? (
        <div className="flex w-full">
          <div className="w-1/5">
            <ul className="space-y-2">
              <li className="flex">
                <ProjectFlagsCard tags={project.tags} />
              </li>
              <li>Client Name: {project.clientName}</li>
              <li>Client Email: {project.clientEmail}</li>
              <li>Client Phone: {project.clientPhoneNum}</li>
            </ul>
          </div>
          <div className="w-1/5">
            <p>{project.description}</p>
          </div>
          <div className="w-3/5 space-y-3">
            <MemberChips />
            <SearchBar items={users} />
            <SearchResultsList />
            <AddButton />
            <SaveButton projectId={project.id} />
          </div>
        </div>
      ) : (
        <h1>null</h1>
      )}
    </AdminProvider>
  );
};
