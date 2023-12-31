"use client";
import React from "react";
import {
  Listbox,
  ListboxSection,
  ListboxItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// State is passed down from parent page
export default function RosterFilters({
  filters,
  setFilters,
}: {
  filters: Set<string>;
  setFilters: () => any;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allProjects"],
    queryFn: async () => {
      const response = await axios.get("/api/projects");
      return response.data;
    },
  });

  return (
    <Popover placement="bottom" offset={10}>
      <PopoverTrigger>
        <Button>Filter</Button>
      </PopoverTrigger>
      <PopoverContent className="bg-background">
        <Listbox
          aria-label="Multiple selection example"
          variant="flat"
          disallowEmptySelection={false}
          selectionMode="multiple"
          selectedKeys={filters}
          onSelectionChange={setFilters}
        >
          {data &&
            data.map((project: any) => (
              <ListboxItem key={project.title}>{project.title}</ListboxItem>
            ))}
        </Listbox>
      </PopoverContent>
    </Popover>
  );
}
