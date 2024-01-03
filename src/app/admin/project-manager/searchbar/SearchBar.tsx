import { useState } from "react";

import { Input } from "@nextui-org/react";

import { UserMinimized } from "../../../../utils/types";
import { useAdmin } from "../../adminContext";

// this is the physical search bar component that is rendered in the admin page
// this could be made to be more generic and reusable in other places
export const SearchBar = ({ items }: { items: UserMinimized[] }) => {
  const { state, dispatch } = useAdmin();

  // this function filters the data based on the input value and sets the search results
  const handleChange = (value: string) => {
    dispatch({ type: "SET_SEARCH_INPUT", payload: value });
    const filteredResults = items.filter((item) => {
      const name = item.firstName + " " + item.lastName;
      return value && name.toLowerCase().includes(value.toLowerCase());
    });
    dispatch({ type: "SET_SEARCH_RESULTS", payload: filteredResults });
  };

  return (
    <div>
      <Input
        className="w-48"
        placeholder="Add Member..."
        value={state.searchInput}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
