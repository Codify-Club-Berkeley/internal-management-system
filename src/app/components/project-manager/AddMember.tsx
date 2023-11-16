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
import NameDropdown from "./NameDropdown";

const initialState = {
  name: "",
};

const AddMember: React.FC<{
  allMembers: string[];
}> = ({ allMembers }) => {
  const [name, setName] = useState(initialState);
  function onNameSearch(event: ChangeEvent<HTMLInputElement>) {
    setName({ ...name, [event.target.name]: event.target.value });
  }

  const filteredMembers = allMembers.filter((member) => {
    "" || member.includes(name.name);
  });

  const objectAllMembers = filteredMembers.map((member) => ({
    fullname: member,
  }));

  return (
    <>
      <div>
        <SearchBarInput
          type="text"
          id="Name"
          placeholder="Name..."
          name="name"
          onChange={onNameSearch}
        />
      </div>
      <div>
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
      </div>
    </>
  );
};

export default AddMember;
