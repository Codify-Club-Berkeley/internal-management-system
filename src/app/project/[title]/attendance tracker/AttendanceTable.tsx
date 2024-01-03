import React from "react";

import { MeetingWithPresentAbsentAndExcused } from "@/utils/types";
import { Meeting, User } from "@prisma/client";

import MeetingEntryWrapper from "./meeting entries/MeetingEntryWrapper";

export default function AttendanceTable({
  Members,
  Meetings,
}: {
  Members: User[];
  Meetings: MeetingWithPresentAbsentAndExcused[];
}) {
  // Sort the members alphabetically by first name to keep a consistent ordering
  // Assume first names are defined
  const sortedMembers = Members.sort((a, b) =>
    a.firstName.localeCompare(b.firstName),
  );

  return (
    <>
      {Meetings.map((meeting, index) => (
        <MeetingEntryWrapper
          key={index}
          meeting={meeting}
          members={sortedMembers}
        />
      ))}
    </>
  );
}
