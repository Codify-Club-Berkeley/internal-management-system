"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { User } from "@prisma/client";

export default function RosterTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await axios.get("/api/user");
      return response.data;
    },
  });
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <Table aria-label="Example static collection table" isStriped={true}>
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>PHONE NUMBER</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((user: User, index: number) => (
          <TableRow key={index}>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell>{user.email}</TableCell>

            <TableCell>{user.phoneNum}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
