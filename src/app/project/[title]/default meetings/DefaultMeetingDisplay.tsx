// DisplayMeetingSettings.tsx

import React from "react";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";

import MeetingEditor from "./MeetingEditor";

type MeetingSettingsProps = {
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  location: string;
  name: string;
};

const DefaultMeetingDisplay: React.FC<MeetingSettingsProps> = ({
  startTime,
  endTime,
  dayOfWeek,
  location,
  name,
}) => {
  return (
    <Card className="mx-auto my-8">
      <CardHeader className="justify-between">
        <div className="flex flex-grow items-center">
          <h2>Meeting Settings</h2>
          <div className="ml-auto">
            <MeetingEditor />
          </div>
        </div>
      </CardHeader>
      <CardBody className="space-y-2">
        <p>
          <b>Start Time:</b> {startTime || "Not set"}
        </p>
        <p>
          <b>End Time:</b> {endTime || "Not set"}
        </p>
        <p>
          <b>Day Of Week:</b> {dayOfWeek || "Not set"}
        </p>
        <p>
          <b>Location:</b> {location || "Not set"}
        </p>
        <p>
          <b>Name:</b> {name || "Not set"}
        </p>
      </CardBody>
    </Card>
  );
};

export default DefaultMeetingDisplay;
