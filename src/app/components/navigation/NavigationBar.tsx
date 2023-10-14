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
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import CodifyLogo from "../../../../assets/Codify Berkeley.png";

export default function NavigationBar() {
  const { isSignedIn, user, isLoaded } = useUser();

  // Only load the Nav bar if someone is signed in
  if (isLoaded && !isSignedIn) return null;

  return (
    <Navbar>
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
          <Link color="foreground" href="/profile">
            Profile
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/roster">
            Roster
          </Link>
        </NavbarItem>
        <NavbarItem>
          <UserButton afterSignOutUrl={process.env.SITE_URL} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
