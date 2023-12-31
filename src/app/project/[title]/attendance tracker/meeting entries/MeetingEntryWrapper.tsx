import React from "react";
import { Meeting, User } from "@prisma/client";
import { AttendanceProvider, useAttendance } from "../attendanceContext";
import MeetingData from "./MeetingData";
import MeetingAttendance from "./MeetingAttendance";

export default function MeetingEntryWrapper({
  meeting,
  members,
}: {
  meeting: Meeting;
  members: User[];
}) {
  return (
    <AttendanceProvider meeting={meeting} members={members}>
      <MeetingData />
      <MeetingAttendance />
    </AttendanceProvider>
  );
}
