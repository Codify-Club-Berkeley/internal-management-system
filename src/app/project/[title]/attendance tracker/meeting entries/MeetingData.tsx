import React from "react";
import { useAttendance } from "../attendanceContext";
import { Card, CardBody } from "@nextui-org/react";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { meetingDateExtract } from "@/utils/helpers";

export default function MeetingData() {
  const { state, dispatch } = useAttendance();

  const [meetingDate, meetingTime] = meetingDateExtract(
    String(state.meeting?.start),
    String(state.meeting?.end),
  );

  return (
    <Card>
      <CardBody>
        <p>{state.meeting?.title}</p>
        <p>{meetingDate}</p>
        <p>{meetingTime}</p>
        <div>
          <SaveIcon />
          <EditIcon />
          <CheckIcon />
        </div>
      </CardBody>
    </Card>
  );
}
