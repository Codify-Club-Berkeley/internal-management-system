"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import CodifyLogo from "../../../assets/Codify Berkeley.png";
import { User } from "@prisma/client";
import { projectNameStringFormatter } from "../../utils/helpers";

export default function NavigationBar() {
  const { isSignedIn, user, isLoaded } = useUser();

  const { data: currentUser, isLoading: userLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await axios.get("/api/user/me");
      return response.data;
    },
  });

  // Only load the Nav bar if someone is signed in
  if (isLoaded && !isSignedIn) return null;
  const size = currentUser?.projects.length || 0;

  return (
    <Navbar className="bg-primary">
      <NavbarBrand>
        <Link href="/">
          <Image
            src={CodifyLogo}
            alt="Codify Berkeley"
            width={125}
            height={100}
          />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {/*Maps the user's current projects to their teams and puts navigation hrefs on the task bar*/}

        {/* Project Links */}
        {currentUser?.projects.map((project) => (
          <NavbarItem key={project.id}>
            {" "}
            {/* Assuming each project has a unique 'id' property */}
            <Link color="foreground" href={`/project/${project.title}`}>
              {projectNameStringFormatter(project.title)}
            </Link>
          </NavbarItem>
        ))}

        {/*The other reference links in the taskbar*/}
        <NavbarItem>
          <Link color="foreground" href="/admin">
            Admin
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={"/profile/" + currentUser?.slug}>
            Profile
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/roster">
            Roster
          </Link>
        </NavbarItem>
        <NavbarItem>
          <UserButton afterSignOutUrl={process.env.NEXT_PUBLIC_SITE_URL} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
