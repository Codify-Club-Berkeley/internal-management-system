// DisplayMeetingSettings.tsx

import React from "react";

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
  return (
    <Card className="mx-auto my-8">
      <CardHeader className="justify-between">
        <div className="flex flex-grow items-center">
          <h2>Meeting Settings</h2>
          <div className="ml-auto">
            <MeetingEditor
              meetingId="temp"
              isDefault={true}
              state={{
                attendance: {},
                members: [],
                edited: false,
                meeting: meeting,
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="space-y-2">
        <p>
          <b>Start Time:</b> {"Not set"}
        </p>
        <p>
          <b>End Time:</b> {"Not set"}
        </p>
        <p>
          <b>Day Of Week:</b> {"Not set"}
        </p>
        <p>
          <b>Location:</b> {"Not set"}
        </p>
        <p>
          <b>Name:</b> {"Not set"}
        </p>
      </CardBody>
    </Card>
  );
};

export default DefaultMeetingDisplay;
