import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const AttendanceTracker: React.FC = () => {
  const [dates, setDates] = useState<Date[]>([
    new Date("2023-10-25"),
    new Date("2023-10-18"),
    new Date("2023-10-11"),
  ]);

  const members: string[] = ["Member 1", "Member 2", "Member 3"];

  const initialAttendanceData: (string | null)[] = members.map(() => null); // Initialize to null

  const [attendance, setAttendance] = useState<(string | null)[][]>(
    dates.map(() => [...initialAttendanceData]),
  );

  const [newMeetingDate, setNewMeetingDate] = useState<Date | null>(new Date());
  const [editableCell, setEditableCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const handleAttendanceChange = (
    dateIndex: number,
    memberIndex: number,
    status: string,
  ) => {
    const updatedAttendance: (string | null)[][] = [...attendance];
    updatedAttendance[dateIndex][memberIndex] = status;
    setAttendance(updatedAttendance);
  };

  const markAllAsPresent = () => {
    // Create a copy of the attendance array
    const updatedAttendance: (string | null)[][] = [...attendance];
    // Get the index of the most recent date
    const mostRecentDateIndex = 0;
    // Loop through members and mark them as "Present" for the most recent date
    for (let memberIndex = 0; memberIndex < members.length; memberIndex++) {
      updatedAttendance[mostRecentDateIndex][memberIndex] = "Present";
    }
    // Update the state with the modified attendance data
    setAttendance(updatedAttendance);
  };

  const addMeeting = () => {
    if (newMeetingDate) {
      setDates([newMeetingDate, ...dates]);

      const newAttendanceRow: (string | null)[] = members.map(() => null);
      setAttendance([newAttendanceRow, ...attendance]);

      setNewMeetingDate(null);
    }
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const renderDatePicker = (dateIndex: number) => (
    <DatePicker
      selected={dates[dateIndex]}
      onChange={(date: Date | null) => handleDateChange(date, dateIndex)}
      withPortal // Add this prop to render the date picker in a portal
    />
  );

  const handleDateChange = (date: Date | null, dateIndex: number) => {
    if (date !== null) {
      const updatedDates = [...dates];
      updatedDates[dateIndex] = date;
      setDates(updatedDates);
    }
    setEditableCell(null);
  };

  const renderDropdown = (dateIndex: number, memberIndex: number) => {
    const options: string[] = [
      "Present",
      "Excused Absence",
      "Unexcused Absence",
    ];

    return (
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            className="capitalize"
            style={{
              width: "10rem", // Set fixed dropdown width
              textAlign: "center", // Center text horizontally in dropdown
              background:
                attendance[dateIndex][memberIndex] === "Present"
                  ? "forestgreen"
                  : attendance[dateIndex][memberIndex] === "Excused Absence"
                  ? "gray"
                  : attendance[dateIndex][memberIndex] === "Unexcused Absence"
                  ? "indianred"
                  : "inherit", // Default background color
            }}
          >
            {attendance[dateIndex][memberIndex] || ""}{" "}
            {/* Display empty string for null values */}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Attendance Status" style={{ width: "10rem" }}>
          {options.map((option) => (
            <DropdownItem
              key={option}
              onClick={() =>
                handleAttendanceChange(dateIndex, memberIndex, option)
              }
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  };

  return (
    <div className="inline-block rounded-lg bg-black p-4 shadow-md">
      <Button onClick={markAllAsPresent}>Mark All as Present</Button>

      <Button onClick={addMeeting}>Add Meeting</Button>

      <table>
        <thead>
          <tr>
            <th className="px-3 py-2">Date</th>
            {members.map((member, memberIndex) => (
              <th className="px-3 py-2" key={memberIndex}>
                {member}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dates.map((date, dateIndex) => (
            <tr key={dateIndex}>
              <td className="px-3 py-2">{renderDatePicker(dateIndex)}</td>
              {members.map((member, memberIndex) => (
                <td className="px-3 py-2" key={memberIndex}>
                  {renderDropdown(dateIndex, memberIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTracker;
