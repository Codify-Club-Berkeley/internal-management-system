import React from "react";
import { Chip } from "@nextui-org/react";
import { User } from "@prisma/client";
import { useAdminStore } from "../ProjectSection";

const MemberChips: React.FC<{}> = () => {
  const { edited, setEdited, projectMembers, setProjectMembers } =
    useAdminStore();

  const handleClose = (membertoRemove: any) => {
    console.log(membertoRemove);

    console.log(projectMembers);
    // Remove the member from the list and set the state
    setProjectMembers(
      projectMembers.filter((member: any) => member.id !== membertoRemove.id),
    );

    console.log(projectMembers);

    setEdited(true);
  };

  return (
    <div className="flex gap-2">
      {projectMembers.map((member, index) => (
        <Chip
          key={index}
          onClose={() => handleClose(member)}
          variant="flat"
          size="lg"
        >
          {member.firstName + " " + member.lastName}
        </Chip>
      ))}
    </div>
  );
};

export default MemberChips;
