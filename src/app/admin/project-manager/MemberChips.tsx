import React from "react";
import { Chip } from "@nextui-org/react";
import { User } from "@prisma/client";
import { useAdmin } from "../adminContext";

const MemberChips: React.FC<{}> = () => {
  const { state, dispatch } = useAdmin();

  const handleClose = (membertoRemove: any) => {
    dispatch({ type: "REMOVE_MEMBER", payload: membertoRemove });
  };

  return (
    <div className="flex gap-2">
      {state.members.map((member, index) => (
        <Chip
          key={index}
          onClose={() => handleClose(member)}
          variant="flat"
          size="lg"
        >
          {member.name}
        </Chip>
      ))}
    </div>
  );
};

export default MemberChips;
