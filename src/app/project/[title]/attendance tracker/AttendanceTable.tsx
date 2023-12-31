import React from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { User, Meeting } from "@prisma/client";

import MeetingEntryWrapper from "./meeting entries/MeetingEntryWrapper";

export default function AttendanceTable({
  Members,
  Meetings,
}: {
  Members: User[];
  Meetings: Meeting[];
}) {
  // Sort the members alphabetically by first name to keep a consistent ordering
  // Assume first names are defined
  const sortedMembers = Members.sort((a, b) =>
    a.firstName.localeCompare(b.firstName),
  );

  return (
    <>
      <MeetingEntryWrapper meeting={Meetings[0]} members={sortedMembers} />
    </>
  );
}
