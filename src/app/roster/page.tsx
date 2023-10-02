// Roster view page
// Query all users, and then filter them with dropdowns on the client side.
import React from "react";
import ky from "ky";
import { UserButton } from "@clerk/nextjs";

export default async function Page() {
  const data: any = await ky
    .get("http://localhost:3000/api/user/validate")
    .json();
  return (
    <div>
      <UserButton />
      {data.user}
    </div>
  );
}
