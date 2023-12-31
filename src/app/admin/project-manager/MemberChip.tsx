import React from "react";
import { Tooltip } from "@nextui-org/react";

export const MemberChip = ({
  name,
  isLead,
  onDelete,
  onAction,
}: {
  name: string;
  isLead: boolean;
  onDelete: () => void;
  onAction: () => void;
}) => {
  return (
    <div className="flex items-center rounded-full bg-zinc-800 px-4 py-2 text-sm font-medium text-gray-800">
      <p className={"text-white " + (isLead ? "font-bold" : "font-normal")}>
        {name}
      </p>
      <Tooltip
        content={isLead ? "Demote to Member" : "Promote to Lead"}
        delay={1500}
      >
        <button
          onClick={onAction}
          className="bg-grey-400 ml-2 rounded-full px-2 py-1 text-xs font-semibold leading-normal text-white transition duration-300 hover:bg-blue-700"
        >
          {isLead ? "⌄" : "^"}
        </button>
      </Tooltip>
      <button
        onClick={onDelete}
        className="bg-grey-400 ml-2 rounded-full px-2 py-1 text-xs font-semibold leading-normal text-white transition duration-300 hover:bg-red-700"
      >
        X
      </button>
    </div>
  );
};

export default MemberChip;
