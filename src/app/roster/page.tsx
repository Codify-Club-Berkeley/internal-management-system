"use client";

import React, { useState } from "react";
import RosterTable from "./RosterTable";
import RosterFilters from "./RosterFilters";

export default function Page() {
  // If filters in an empty array, then show everything
  // Otherwise, it will be an array of strings that are the project names
  // only show the users that are on those projects
  const [filters, setFilters] = React.useState([]);

  const handleSelectionChange = (newSelection: any) => {
    setFilters(newSelection);
  };

  // Display the selected values nicely
  const selectedValue = React.useMemo(
    () => Array.from(filters).join(", "),
    [filters],
  );
  return (
    <div className="dark">
      <RosterFilters filters={filters} setFilters={handleSelectionChange} />
      <RosterTable filters={filters} />
      <div>{selectedValue}</div>
    </div>
  );
}
