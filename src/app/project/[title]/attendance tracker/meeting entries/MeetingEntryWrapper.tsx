import React from "react";
import { Meeting, User } from "@prisma/client";
import { AttendanceProvider, useAttendance } from "../attendanceContext";
import { Card, CardBody, Button } from "@nextui-org/react";

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
      <Card>
        <CardBody>
          <div className="flex flex-row">
            <MeetingData />
            <MeetingAttendance />
          </div>
        </CardBody>
      </Card>
    </AttendanceProvider>
  );
}
