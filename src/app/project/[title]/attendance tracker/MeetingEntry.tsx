import React from "react";
import { Meeting } from "@prisma/client";
import { AttendanceProvider, useAttendance } from "./attendanceContext";

export default function MeetingEntry({ meeting }: { meeting: Meeting }) {
  return (
    <AttendanceProvider>
      <h1>content</h1>
    </AttendanceProvider>
  );
}
