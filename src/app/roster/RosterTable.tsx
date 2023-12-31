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
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import copy from "copy-to-clipboard";
import { projectNameStringFormatter } from "@/utils/helpers";

export default function RosterTable({ filters }: { filters: Set<string> }) {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await axios.get("/api/user");
      return response.data;
    },
  });

  // The filtered users are an array of indices of the users
  const [filtered, setFiltered] = useState<Set<number>>(new Set<number>());

  // Every time the filters change, we want to re evaluate which users to show
  useEffect(() => {
    if (!users) {
      return;
    }

    const filteredUsers = new Set<number>();

    // Iterate through the users and see if they are on the projects
    for (let i = 0; i < users.length; i++) {
      // Get the user's projects
      let usersProjects = users[i].projects;

      // Iterate through the user's projects and see any of their titles are in the filters set
      for (let j = 0; j < usersProjects.length; j++) {
        if (filters.has(usersProjects[j].title)) {
          filteredUsers.add(i);
        }
      }
    }

    setFiltered(filteredUsers);
  }, [filters, users]);

  // When the copy button is pressed, copy the emails of all currently filtered users
  // If there are no filters, copy all emails
  const handleCopy = () => {
    console.log("copying");
    let emails = "";
    for (let i = 0; i < users.length; i++) {
      if (filtered.has(i) || filters.size == 0) {
        emails += users[i].email + ", ";
      }
    }
    copy(emails);
  };

  return (
    <Table aria-label="Members Roster" isStriped={true}>
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>
          EMAIL{" "}
          <Button isIconOnly variant="light" onPress={handleCopy}>
            <ContentCopyOutlinedIcon fontSize="small" />
          </Button>
        </TableColumn>
        <TableColumn>PHONE NUMBER</TableColumn>
        <TableColumn>GRAD YEAR</TableColumn>
        <TableColumn>PROJECTS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={<p>loading...</p>}>
        {!isLoading &&
          users
            .filter(
              (_item, index: number) =>
                filtered.has(index) || filters.size == 0, // If the size of the filters is 0, then we want to show all users
            )
            .map((user: any, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  <User
                    name={user.firstName + " " + user.lastName}
                    description={
                      <>
                        <Link href={"/profile/" + user.slug}>
                          <AccountBoxIcon fontSize="small" />
                        </Link>
                        {user.githubUsername && (
                          <Link
                            href={"https://github.com/" + user.githubUsername}
                            target="_blank"
                          >
                            <GitHubIcon fontSize="small" />
                          </Link>
                        )}

                        {user.linkedInUrl && (
                          <Link
                            href={"https://linkedin.com/in/" + user.linkedInUrl}
                            target="_blank"
                          >
                            <LinkedInIcon fontSize="small" />
                          </Link>
                        )}
                      </>
                    }
                    avatarProps={{
                      src: user.profilePictureUrl,
                      alt: "Profile Picture",
                    }}
                  />
                </TableCell>
                <TableCell>{user.email}</TableCell>

                <TableCell>{user.phoneNum}</TableCell>
                <TableCell>{user.graduationYear}</TableCell>
                <TableCell>
                  {user.projects
                    .concat(user.leading || [])
                    .map((project: any) => (
                      <p key={project.id}>
                        {projectNameStringFormatter(project.title)}
                      </p>
                    ))}
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
}
