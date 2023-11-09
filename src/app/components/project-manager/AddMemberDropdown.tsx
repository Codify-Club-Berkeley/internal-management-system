import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

interface memberInfo {
  id: string;
  name: string;
}

const AddMemberDropdown: React.FC<{
  allMembers: Array<memberInfo>;
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
          <DropdownItem key={index}>{member.name}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default AddMemberDropdown;
