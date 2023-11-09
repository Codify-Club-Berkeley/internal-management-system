import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { User } from "@prisma/client";

const AddMemberDropdown: React.FC<{
  allMembers: User[];
}> = ({ allMembers }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">+ Add Member</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={allMembers}>
        {allMembers.map((member, index) => (
          //should add an onPress event to this DropdownItem
          //when pressed, should add the selected member to the project team via backend
          <DropdownItem key={index}>
            {member.firstName}+{member.lastName}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default AddMemberDropdown;
