import React from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
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
import { User, Project } from "@prisma/client";

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
      const response = await axios.get("/api/projects");
      return response.data as Project[];
    },
  });

  //need to be added to the database as a property for projects
  const tags = ["client", "unpaid"];

  return (
    <Accordion selectionMode="multiple" variant="shadow">
      {!projectsLoading &&
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
                  <li>Project created at {project.createdAt}</li>
                  <li>Project updated on {project.updatedAt}</li>
                  <li>Other information</li>
                </ul>
              </div>
              <div className="mx-3"></div> {/* Horizontal spacing */}
              <div>
                <MemberChips
                  membersofProject={project.leads}
                  membertoRemove=""
                />
                <MemberChips
                  membersofProject={project.members}
                  membertoRemove=""
                />
                <AddMemberDropdown allMembers={users} />
              </div>
            </div>
          </AccordionItem>
        ))}
    </Accordion>
  );
};

export default ProjectManager;

// import React, { useState } from "react";
// import {
//   Accordion,
//   AccordionItem,
//   Avatar,
//   Button,
//   Spacer,
// } from "@nextui-org/react";

// const ProjectManager: React.FC = () => {
//   const isInternal = true;
//   const isClient = true;

//   const projectMetadata = (
//     <div>
//       {isInternal && <span className="badge badge-primary">Internal</span>}
//       {isClient && <span className="badge badge-secondary">Client</span>}
//     </div>
//   );

//   const memberCards = (
//     <div className="grid grid-cols-2 gap-2">
//       <div>
//         <Avatar size="sm" src="/avatar1.png">
//           J
//         </Avatar>
//         Project Lead: John Doe
//         <Button onClick={() => handleRemoveMember("John Doe")}>Remove</Button>
//       </div>
//       <div>
//         <Avatar size="sm" src="/avatar2.png">
//           J
//         </Avatar>
//         Project Lead: Jane Smith
//         <Button onClick={() => handleRemoveMember("Jane Smith")}>Remove</Button>
//       </div>
//       {/* Other member cards go here */}
//       <div>
//         <Button onClick={() => handleAddMember()}>
//           + Add Member
//         </Button>
//       </div>
//     </div>
//   );

//   const handleRemoveMember = (memberName: string) => {
//     // Handle removing a member from the project
//   };

//   const handleAddMember = () => {
//     // Handle adding a member to the project
//   };

//   return (
//     <Accordion selectionMode="multiple" variant="shadow">
//       <AccordionItem key="1" aria-label="Project Details" title="Project Name">
//         {projectMetadata}
//       </AccordionItem>
//       <AccordionItem
//         key="2"
//         aria-label="Project Members"
//         title="Project Members"
//       >
//         {memberCards}
//       </AccordionItem>
//     </Accordion>
//   );
// };

// export default ProjectManager;
