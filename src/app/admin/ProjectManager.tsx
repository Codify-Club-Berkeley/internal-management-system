import axios from "axios";
import React, { useEffect, useState } from "react";

import { Accordion, AccordionItem } from "@nextui-org/react";
import { Project, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { ProjectWithMembersAndLeads, UserMinimized } from "../../utils/types";
import { ProjectSection } from "./ProjectSection";

const ProjectManager = () => {
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["minimizedUsers"],
    queryFn: async () => {
      const response = await axios.get(
        "/api/user?minimized=true&projects=false",
      );
      return response.data as UserMinimized[];
    },
  });

  const {
    data: projects,
    isLoading: projectsLoading,
    isError: projectsError,
  } = useQuery({
    queryKey: ["allProjects"],
    queryFn: async () => {
      const response = await axios.get("/api/projects?members=true&leads=true");
      return response.data as ProjectWithMembersAndLeads[];
    },
  });

  //need to be added to the database as a property for projects
  const tags = ["client", "unpaid"];

  return (
    <Accordion selectionMode="multiple" variant="shadow">
      {!projectsLoading &&
      !usersLoading &&
      projects &&
      users &&
      projects.length > 0 ? (
        projects.map((project: ProjectWithMembersAndLeads, index: number) => (
          <AccordionItem
            key={index}
            aria-label={project.id}
            title={project.title}
          >
            <ProjectSection project={project} users={users} />
          </AccordionItem>
        ))
      ) : (
        <AccordionItem />
      )}
    </Accordion>
  );
};

export default ProjectManager;
