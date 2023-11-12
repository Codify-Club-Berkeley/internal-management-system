import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import ProjectFlagsCard from "./ProjectFlagsCard";
import MemberChips from "./MemberChips";
import AddMemberDropdown from "./AddMemberDropdown";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User, Project, PrismaClient } from "@prisma/client";

const ProjectManager = () => {
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await axios.get("/api/user");
      return response.data;
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
      return response.data;
    },
  });

  //need to be added to the database as a property for projects
  const tags = ["client", "unpaid"];

  return (
    <Accordion selectionMode="multiple" variant="shadow">
      {projects ? (
        projects.map((project, index) => (
          <AccordionItem
            key={index}
            aria-label={project.id}
            title={project.title}
          >
            <div className="flex">
              <div>
                <ProjectFlagsCard tags={tags} />
                <ul>
                  <li>Project created at {project.createdAt.toString()}</li>
                  <li>Project updated at {project.updatedAt.toString()}</li>
                  <li>Other information</li>
                </ul>
              </div>
              <div className="mx-3"></div> {/* Horizontal spacing */}
              <div>
                <MemberChips
                  membersofProject={project.members.map((member: any) => {
                    return member.firstName + " " + member.lastName;
                  })}
                  membertoRemove=""
                />
                <AddMemberDropdown allMembers={users ? users : []} />
              </div>
            </div>
          </AccordionItem>
        ))
      ) : (
        <AccordionItem />
      )}
    </Accordion>
  );
};

export default ProjectManager;
