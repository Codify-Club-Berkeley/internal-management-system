// Roster view page
// Query all users, and then filter them with dropdowns on the client side.
import React from "react";
import ky from "ky";
import { UserButton } from "@clerk/nextjs";

export default async function Page() {
  return (
    <div>
      <UserButton />
      <h1>roster</h1>
    </div>
  );
}
