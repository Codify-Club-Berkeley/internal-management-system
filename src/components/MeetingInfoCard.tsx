import React from 'react';

import {
    Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input
} from '@nextui-org/react';

const MeetingInfoCard = () => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   const hours = ["7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"];
  const hours = Array.from({ length: 11 }, (_, index) => {
    const hour = index + 1;
    return { value: hour.toString(), label: hour.toString() };
  });
  const minutes = ["00", "30"];
  const durationOptions = ["30 minutes", "1 hour", "1.5 hours", "2 hours", "2.5 hours", "3 hours"];

  const [selectedDay, setSelectedDay] = React.useState("");
  const [selectedHour, setSelectedHour] = React.useState("");
  const [selectedMinute, setSelectedMinute] = React.useState("");
  const [selectedDuration, setSelectedDuration] = React.useState("");

  return (
    <div className="p-4 bg-black rounded-md shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Date and Start Time</h3>
        <div className="flex items-center space-x-4">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize">
                {selectedDay || "Select Day"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {daysOfWeek.map((day) => (
                <DropdownItem key={day} onClick={() => setSelectedDay(day)}>
                  {day}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize">
                {selectedHour || "Select Hour"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {hours.map((hour) => (
                <DropdownItem key={hour.value} onClick={() => setSelectedHour(hour.value)}>
                  {hour.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize">
                {selectedMinute || "Select Minute"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {minutes.map((minute) => (
                <DropdownItem key={minute} onClick={() => setSelectedMinute(minute)}>
                  {minute}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="capitalize">
                {selectedDuration || "Select Duration"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {durationOptions.map((duration) => (
                <DropdownItem key={duration} onClick={() => setSelectedDuration(duration)}>
                  {duration}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Location</h3>
        <Input placeholder="Enter location" />
      </div>
    </div>
  );
};

export default MeetingInfoCard;
