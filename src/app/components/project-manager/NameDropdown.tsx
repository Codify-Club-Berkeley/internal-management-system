import React, { ChangeEvent, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { User } from "@prisma/client";
import SearchBarInput from "./SearchBarInput";

const NameDropdown: React.FC<{
  allMembers: string[];
}> = ({ allMembers }) => {
  const objectAllMembers = allMembers.map((member) => ({ fullname: member }));

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">+ Add Member</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={objectAllMembers}>
        {objectAllMembers.map((member, index) => (
          //should add an onPress event to this DropdownItem
          //when pressed, should add the selected member to the project team via backend
          <DropdownItem key={index}>{member.fullname}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NameDropdown;
