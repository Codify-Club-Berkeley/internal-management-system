"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  User,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

export default function RosterTable({ filters }: { filters: Set<string> }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await axios.get("/api/user");
      return response.data; // todo figure out why I can't say as [User, Project[]][]
      // todo Also contemplate why I didn't just use trpc for this project
    },
  });

  // The filtered users are an array of indices of the users
  const [filtered, setFiltered] = useState<Set<number>>(new Set<number>());

  // Every time the filters change, we want to re evaluate which users to show
  useEffect(() => {
    if (!data) {
      return;
    }

    const filteredUsers = new Set<number>();
    const filtersSet = new Set(filters);

    // Iterate through the users and see if they are on the projects
    for (let i = 0; i < data.length; i++) {
      const user = data[i];
      // If the user is on any of the projects, then add them to the filtered list
      for (let j = 0; j < user[1].length; j++) {
        const project = user[1][j];
        if (filtersSet.has(project.title)) {
          filteredUsers.add(i);
          break;
        }
      }
    }
    console.log(filters.size);
    setFiltered(filteredUsers);
  }, [filters, data]);

  return (
    <Table aria-label="Members Roster" isStriped={true}>
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>
          EMAIL{" "}
          <Button
            isIconOnly
            variant="light"
            onPress={() => {
              console.log("copying");
            }}
          >
            <ContentCopyOutlinedIcon fontSize="small" />
          </Button>
        </TableColumn>
        <TableColumn>PHONE NUMBER</TableColumn>
        <TableColumn>PROJECTS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={<p>loading...</p>}>
        {!isLoading &&
          data
            .filter(
              (item, index: number) => filtered.has(index) || filters.size == 0, // If the size of the filters is 0, then we want to show all users
            )
            .map((tup: any, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  <User
                    name={tup[0].firstName + " " + tup[0].lastName}
                    description={
                      <Link href={"/profile/" + tup[0].slug}> Profile </Link>
                    }
                    avatarProps={{
                      src: tup[0].profilePictureUrl,
                      alt: "Profile Picture",
                    }}
                  />
                </TableCell>
                <TableCell>{tup[0].email}</TableCell>

                <TableCell>{tup[0].phoneNum}</TableCell>
                <TableCell>
                  {tup[1].map((project: any) => (
                    <p key={project.id}>{project.title}</p>
                  ))}
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
