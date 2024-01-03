import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

import { daysOfWeek } from "./constants";

// Simple helper functions used throughout the app

// Formats project name strings to be more readable in the frontend
// turns internal-project-name to Internal Project Name
export function projectNameStringFormatter(str: string): string {
  return str
    .toLowerCase()
    .replace(/\b(\w)/g, (s) => s.toUpperCase())
    .replace(/-/g, " ");
}

// Given an API input in the validated format, format all of the connections and disconnections between models
// Any field in the input prefixed with "add" or "remove" is an array of ids that will be connected or disconnected from the model
// All other fields will be unchanged

// Example input:
// {
// title: z.string().optional(),
// addUsers: z.array(z.string()).optional(),
// removeUsers: z.array(z.string()).optional(),
// addLeads: z.array(z.string()).optional(),
// removeLeads: z.array(z.string()).optional(),
// }

// Example output:
// data: {
//   title: body.title,
//   members: {
//     connect: addUsers,
//     disconnect: removeUsers,
//   },
//   leads: {
//     connect: addLeads,
//     disconnect: removeLeads,
//   },
// },
export function formatModelConnections(input: any): any {
  let formatted: any = {};

  // Get all of the keys in the input
  const keys: string[] = Object.keys(input);

  // Loop through each key
  keys.forEach((key: string) => {
    if (key.startsWith("add")) {
      // Get the second half of the key name and format it to be all lower case
      // Example: addUsers -> users
      const modelName = key.replace("add", "").toLowerCase();

      // Format the array of ids to be used in the update
      const addIds = input[key].map((addId: string) => ({ id: addId }));

      // Add the formatted array of ids to the formatted object
      // If the model name already exists in the formatted object, add the connect field
      if (formatted[modelName]) {
        formatted[modelName].connect = addIds;
      } else {
        // If the model name does not exist in the formatted object, create it and add the connect field
        formatted[modelName] = {
          connect: addIds,
        };
      }
    } else if (key.startsWith("remove")) {
      // Get the second half of the key name and format it to be all lower case
      // Example: removeUsers -> users
      const modelName = key.replace("remove", "").toLowerCase();

      // Format the array of ids to be used in the update
      const removeIds = input[key].map((removeId: string) => ({
        id: removeId,
      }));

      // Add the formatted array of ids to the formatted object
      // If the model name already exists in the formatted object, add the disconnect field
      if (formatted[modelName]) {
        formatted[modelName].disconnect = removeIds;
      } else {
        // If the model name does not exist in the formatted object, create it and add the disconnect field
        formatted[modelName] = {
          disconnect: removeIds,
        };
      }
    } else {
      // If the key does not start with "add" or "remove", add it to the formatted object
      formatted[key] = input[key];
    }
  });

  return formatted;
}

// Given a start and end datetime for a meeting, extract the date and time in a readable format
// Returns a tuple of two strings: [date, time]
export function meetingDateExtract(
  start: string,
  end: string,
): [string, string] {
  // Define the Pacific Time Zone
  const timeZone = "America/Los_Angeles";

  // Parse out the date from the start and end times, assume the date is the same for both
  // Format the date in the format, "Monday December 31, 2021"
  const date = dayjs(start).format("dddd MMMM D, YYYY");

  // Parse out the time from the start and end times, return in the format "start - end"
  const time = `${dayjs(start).format("h:mm A")} - ${dayjs(end).format(
    "h:mm A",
  )}`;

  return [date, time];
}

// Given form inputs, return a formatted object to be used in the API call
export function getMeetingStartEndDates(
  meetingDate: string,
  startTime: string,
  endTime: string,
): { start: Date; end: Date } {
  const startDate = new Date(`${meetingDate}T${startTime}:00-08:00`); // Assuming PST is -8 hours
  const endDate = new Date(`${meetingDate}T${endTime}:00-08:00`);

  return { start: startDate, end: endDate };
}

// Extract meeting details given start and end dates
export function extractMeetingDetails(
  startDate: string,
  endDate: string,
): {
  dayOfWeek: string;
  meetingDate: string;
  startTime: string;
  endTime: string;
} {
  const meetingDate = startDate.toString().split("T")[0]; // Extract date part
  const dayOfWeek = dayjs(startDate).format("dddd");
  const startTime = String(startDate).split("T")[1].substring(3, 8); // Extract time part
  const endTime = String(endDate).split("T")[1].substring(3, 8); // Extract time part

  return { dayOfWeek, meetingDate, startTime, endTime };
}

function getFirstDateOfWeekIn1970(dayOfWeek: string) {
  // Convert the dayOfWeek string to a number that corresponds with JavaScript's getDay() method
  const dayIndex = daysOfWeek.indexOf(dayOfWeek);

  // Check if the dayOfWeek is valid
  if (dayIndex === -1) {
    throw new Error("Invalid day of the week");
  }

  // Create a date object for January 1, 1970
  const date = new Date("1970-01-01T00:00:00Z");
  date.setUTCHours(0, 0, 0, 0); // Ensure it's the very start of the day

  // Loop through the days of 1970 until the first occurrence of the given day of the week is found
  while (date.getUTCDay() !== dayIndex) {
    date.setUTCDate(date.getUTCDate() + 1); // Increment the day by one
  }

  return date;
}
