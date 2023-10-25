import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const AttendanceTracker: React.FC = () => {
  const dates: string[] = [
    "10/25/2023",
    "10/18/2023",
    "10/11/2023",
    // Add more dates
  ];

  const members: string[] = ["Member 1", "Member 2", "Member 3"];

  const initialAttendanceData: (string | null)[] = members.map(() => null); // Initialize to null

  const [attendance, setAttendance] = useState<(string | null)[][]>(
    dates.map(() => [...initialAttendanceData]),
  );

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
                  ? "lightcoral"
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
    <div className="p-4 bg-black rounded-lg shadow-md">
      <Button onClick={markAllAsPresent}>Mark All as Present</Button>

      <table>
        <thead>
          <tr>
            <th className="py-2 px-3">Date</th>
            {members.map((member, memberIndex) => (
              <th className="py-2 px-3" key={memberIndex}>
                {member}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dates.map((date, dateIndex) => (
            <tr key={dateIndex}>
              <td className="py-2 px-3">{date}</td>
              {members.map((member, memberIndex) => (
                <td className="py-2 px-3" key={memberIndex}>
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
