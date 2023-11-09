import React from "react";
import { Accordion, AccordionItem, Card } from "@nextui-org/react";
import ProjectFlagsCard from "./ProjectFlagsCard";
import MemberChips from "./MemberChips";
import AddMemberDropdown from "./AddMemberDropdown";

const ProjectManager = () => {
  // Define the contents of the cards

  const isInternal = true; // Set to true if it's an internal project
  const isPaid = false; // Set to true if it's a client project

  //list of members for a project, should be fetched from backend
  const memberNames = ["Elaine", "Aidan", "Owen", "Cady"];

  //list of all members in the club that can be added to oa team, should be fetched from backend
  const allMembers = [
    {
      id: "000",
      name: "Aidan",
    },
    {
      id: "001",
      name: "Elaine",
    },
    {
      id: "010",
      name: "Owen",
    },
    {
      id: "011",
      name: "Cady",
    },
    {
      id: "100",
      name: "Abby",
    },
    {
      id: "101",
      name: "Bob",
    },
  ];

  const projectInfo = (
    // Placeholder for project flags
    <ul>
      <li>Su23, Fa23, Sp24</li>
      <li>6 members</li>
    </ul>
  );

  const card2Content = (
    // Placeholder for project members
    <Card title="Members" className="p-4 bg-gray-500 ">
      {"A project's team member cards will go here."}
    </Card>
  );

  return (
    <Accordion selectionMode="multiple" variant="shadow">
      <AccordionItem key="1" aria-label="Accordion 1" title="IMS">
        <div className="flex">
          <div>
            <ProjectFlagsCard
              tags={["internal", "unpaid", "fun", "collaborative"]}
            />
            {projectInfo}
          </div>
          <div className="mx-3"></div> {/* Horizontal spacing */}
          <div>
            <MemberChips memberNames={memberNames} membertoRemove="" />
            <AddMemberDropdown allMembers={allMembers} />
          </div>
        </div>
      </AccordionItem>

      <AccordionItem key="2" aria-label="Accordion 2" title="Kopernicus">
        <div className="flex">
          <div>
            <ProjectFlagsCard tags={["client", "paid"]} />
            {projectInfo}
          </div>
          <div className="mx-3"></div> {/* Horizontal spacing */}
          <div>
            <MemberChips memberNames={memberNames} membertoRemove="" />
            <AddMemberDropdown allMembers={allMembers} />
          </div>
        </div>
      </AccordionItem>
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
