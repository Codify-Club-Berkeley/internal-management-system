import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useAttendance } from "../attendanceContext";
import { UserMinimized } from "@/utils/helpers";
import { AttendanceStatus } from "../attendanceContext";

export default function MeetingAttendance() {
  const { state, dispatch } = useAttendance();

  function handleAttendanceChange(key: React.Key, member: UserMinimized) {
    console.log("handleAttendanceChange: " + key);
    dispatch({
      type: "MARK_STATUS",
      payload: { userId: member.id, status: key as AttendanceStatus },
    });
  }

  // Returns the appropriate background color for the attendance status
  function colorBackground(memberId: string) {
    if (state.attendance[memberId] == "present") return "bg-green-800";
    if (state.attendance[memberId] == "absent") return "bg-red-800";
    if (state.attendance[memberId] == "excused") return "bg-yellow-800";
    return "bg-gray-800";
  }

  return (
    <div className="flex grow justify-around border">
      {state.members.map((member, index) => (
        <div key={index} className="flex-col border">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className={colorBackground(member.id)}>
                {state.attendance[member.id]}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(key) => handleAttendanceChange(key, member)}
              aria-label="Static Actions"
            >
              <DropdownItem key="present">Present</DropdownItem>
              <DropdownItem key="absent">Absent</DropdownItem>
              <DropdownItem key="excused">Excused</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <p>{member.name}</p>
        </div>
      ))}
    </div>
  );
}
