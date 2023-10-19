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
import CodifyLogo from "../../../../assets/Codify Berkeley.png";
import { User } from "@prisma/client";

export default function NavigationBar() {
  const { isSignedIn, user, isLoaded } = useUser();

  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await axios.get("/api/user/me");
      return response.data as User;
    },
  });

  // Only load the Nav bar if someone is signed in
  if (isLoaded && !isSignedIn) return null;

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
        <NavbarItem>
          <Link color="foreground" href="/admin">
            Admin
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={"/profile/" + data?.slug}>
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
