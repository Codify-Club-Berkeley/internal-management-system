import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProjectSection } from "./ProjectSection";
import { User, Project } from "@prisma/client";
import { usersMinimizer } from "@/utils/helpers";

const ProjectManager = () => {
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await axios.get("/api/user");
      return response.data as User[];
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
      return response.data as Project[];
    },
  });

  //need to be added to the database as a property for projects
  const tags = ["client", "unpaid"];

  return (
    <Accordion selectionMode="multiple" variant="shadow">
      {projects && projects.length > 0 ? (
        projects.map((project: Project, index: number) => (
          <AccordionItem
            key={index}
            aria-label={project.id}
            title={project.title}
          >
            <h1>{index}</h1>
            <ProjectSection project={project} users={usersMinimizer(users)} />
          </AccordionItem>
        ))
      ) : (
        <AccordionItem />
      )}
    </Accordion>
  );
};

export default ProjectManager;
