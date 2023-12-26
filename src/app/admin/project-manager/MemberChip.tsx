import React from "react";

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
      <button
        onClick={onAction}
        className="bg-grey-400 ml-2 rounded-full px-2 py-1 text-xs font-semibold leading-normal text-white transition duration-300 hover:bg-blue-700"
      >
        ^
      </button>
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
