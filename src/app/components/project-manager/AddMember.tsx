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
        <NameDropdown allMembers={filteredMembers} />
      </div>
    </>
  );
};

export default AddMember;
