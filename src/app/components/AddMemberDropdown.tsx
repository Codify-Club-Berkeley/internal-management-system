import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

interface memberInfo {
  key: string;
  label: string;
}

const AddMemberDropdown: React.FC<{
  items: Array<memberInfo>;
}> = ({ items }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">+ Add Member</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {items.map((item, index) => (
          //should add an onPress event to this DropdownItem
          //when pressed, should add the selected member to the project team via backend
          <DropdownItem key={index}>{item.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default AddMemberDropdown;
