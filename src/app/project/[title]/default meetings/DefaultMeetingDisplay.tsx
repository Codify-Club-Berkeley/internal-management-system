// DisplayMeetingSettings.tsx

import React from "react";

import {
  extractMeetingDetails,
  formatDate,
  formatStartEndTimes,
} from "@/utils/helpers";
import { MeetingWithPresentAbsentAndExcused } from "@/utils/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";

import MeetingEditor from "./MeetingEditor";

type MeetingSettingsProps = {
  meeting: MeetingWithPresentAbsentAndExcused | null;
};

const DefaultMeetingDisplay: React.FC<MeetingSettingsProps> = ({ meeting }) => {
  if (!meeting) return null;

  const { dayOfWeek, meetingDate, startTime, endTime } = extractMeetingDetails(
    String(meeting.start),
    String(meeting.end),
  );
  return (
    <Card className="mx-auto my-8">
      <CardHeader className="justify-between">
        <div className="flex flex-grow items-center">
          <h2>Meeting Settings</h2>
          <div className="ml-auto">
            <MeetingEditor isDefault={true} meeting={meeting} />
          </div>
        </div>
      </CardHeader>
      <CardBody className="space-y-2">
        <p>
          <b>Start Time:</b> {startTime}
        </p>
        <p>
          <b>End Time:</b> {endTime}
        </p>
        <p>
          <b>Day Of Week:</b> {dayOfWeek}
        </p>
        <p>
          <b>Location:</b> {meeting.location}
        </p>
        <p>
          <b>Title:</b> {meeting.title}
        </p>
      </CardBody>
    </Card>
  );
};

export default DefaultMeetingDisplay;
