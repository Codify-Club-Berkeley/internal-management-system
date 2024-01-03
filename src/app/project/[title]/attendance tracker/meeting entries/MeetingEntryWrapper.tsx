import React from "react";

import { MeetingWithPresentAbsentAndExcused } from "@/utils/types";
import { Button, Card, CardBody } from "@nextui-org/react";
import { Meeting, User } from "@prisma/client";

import { AttendanceProvider, useAttendance } from "../attendanceContext";
import MeetingAttendance from "./MeetingAttendance";
import MeetingData from "./MeetingData";

export default function MeetingEntryWrapper({
  meeting,
  members,
}: {
  meeting: MeetingWithPresentAbsentAndExcused;
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
