import React from "react";
import { Chip } from "@nextui-org/react";
import { User } from "@prisma/client";

const MemberChips: React.FC<{
  membersofProject: string[];
  membertoRemove: string;
}> = ({ membersofProject, membertoRemove }) => {
  const [members, setMembers] = React.useState(membersofProject);

  const handleClose = (membertoRemove: string) => {
    setMembers(members.filter((member) => member !== membertoRemove));
  };

  return (
    <div className="flex gap-2">
      {members.map((member, index) => (
        <Chip
          key={index}
          onClose={() => handleClose(member)}
          variant="flat"
          size="lg"
        >
          {member}
        </Chip>
      ))}
    </div>
  );
};

export default MemberChips;