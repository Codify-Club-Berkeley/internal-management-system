import axios from "axios";
import React from "react";

import { meetingDateExtract } from "@/utils/helpers";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Card, CardBody, Tooltip } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import MeetingEditor from "../../default meetings/MeetingEditor";
import { useAttendance } from "../attendanceContext";

export default function MeetingData() {
  const { state, dispatch } = useAttendance();

  const [meetingDate, meetingTime] = meetingDateExtract(
    String(state.meeting?.start),
    String(state.meeting?.end),
  );
  const queryClient = useQueryClient();

  const { mutate: submitMeetingChanges } = useMutation({
    mutationFn: async (data: any) => {
      // Iterate through the member ids to get their attendance status from the state
      // Then add them to the body of the request in addPresent, addAbsent, or addExcused
      type requestBody = {
        addPresent: string[];
        addAbsent: string[];
        addExcused: string[];
      };

      const body: requestBody = {
        addPresent: [],
        addAbsent: [],
        addExcused: [],
      };

      state.members.forEach((member) => {
        if (state.attendance[member.id] == "present") {
          body.addPresent.push(member.id);
        } else if (state.attendance[member.id] == "absent") {
          body.addAbsent.push(member.id);
        } else if (state.attendance[member.id] == "excused") {
          body.addExcused.push(member.id);
        }
      });

      await axios.patch(
        "/api/meeting/" + state.meeting?.id + "?replaceAllAttendanceData=true",
        body,
      );
    },
    onSuccess: () => {
      // Refetch the current user's data to update the UI
      // queryClient.invalidateQueries({
      //   queryKey: ["allProjects"],
      // });

      console.log("Success");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Card>
      <CardBody>
        <p>{state.meeting?.title}</p>
        <p>{meetingDate}</p>
        <p>{meetingTime}</p>
        <div>
          <MeetingEditor
            meetingId={state.meeting?.id}
            isDefault={false}
            state={state}
          />
          <Tooltip content="Mark All Present" delay={1500}>
            <Button
              isIconOnly
              onPress={() => {
                dispatch({
                  type: "MARK_ALL_AS_PRESENT",
                });
              }}
            >
              <CheckIcon />
            </Button>
          </Tooltip>
          {state.edited && (
            <Button
              isIconOnly
              onPress={() => {
                submitMeetingChanges(state);
                dispatch({ type: "RESET_EDITED" });
              }}
            >
              <SaveIcon />
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
