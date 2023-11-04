import React from "react";
import { Accordion, AccordionItem, Card } from "@nextui-org/react";
import ProjectFlagsCard from "./ProjectFlagsCard";

const ProjectManager = () => {
  // Define the contents of the cards

  const isInternal = true; // Set to true if it's an internal project
  const isClient = false; // Set to true if it's a client project

  const card1Content = (
    // Placeholder for project flags
    <Card title="Flags" className="p-4 ">
      {"A project's metadata flags will go here."}
    </Card>
  );

  const card2Content = (
    // Placeholder for project members
    <Card title="Members" className="p-4 bg-gray-500 ">
      {"A project's team member cards will go here."}
    </Card>
  );

  return (
    <Accordion selectionMode="multiple" variant="shadow">
      <AccordionItem key="1" aria-label="Accordion 1" title="Project 1">
        <div className="flex">
          <ProjectFlagsCard isInternal={isInternal} isClient={isClient} />
          <div className="mx-3"></div> {/* Horizontal spacing */}
          {card2Content}
        </div>
      </AccordionItem>

      <AccordionItem key="2" aria-label="Accordion 2" title="Project 2">
        <div className="flex">
          <ProjectFlagsCard isInternal={isInternal} isClient={isClient} />
          <div className="mx-3"></div> {/* Horizontal spacing */}
          {card2Content}
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
