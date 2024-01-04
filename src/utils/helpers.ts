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

// Given two strings in the form hh:mm, return 3:00 - 5:00 PM as a string to be displayed in the frontend
export function formatStartEndTimes(
  startTime: string,
  endTime: string,
): string {
  // Define a helper function to convert 24-hour time to 12-hour format with AM/PM
  function convertTo12Hour(time: string) {
    // Extract hours and minutes from the time string
    const [hours, minutes] = time.split(":").map(Number);

    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour to 12-hour format
    const adjustedHours = hours % 12 || 12; // Adjust 0 or 12 hours to 12 for 12-hour time format

    // Format the time string
    return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  }

  // Convert both start and end times
  const formattedStartTime = convertTo12Hour(startTime);
  const formattedEndTime = convertTo12Hour(endTime);

  // Return the formatted string
  return `${formattedStartTime} - ${formattedEndTime}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Define arrays for days and months
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract components from the date
  const dayOfWeek = days[date.getUTCDay()];
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  // Determine the ordinal indicator
  let ordinalIndicator;
  if (day % 10 === 1 && day !== 11) {
    ordinalIndicator = "st";
  } else if (day % 10 === 2 && day !== 12) {
    ordinalIndicator = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    ordinalIndicator = "rd";
  } else {
    ordinalIndicator = "th";
  }

  // Construct the formatted date string
  return `${dayOfWeek}, ${month} ${day}${ordinalIndicator}, ${year}`;
}

// Given form inputs, return a formatted object to be used in the API call
export function getMeetingStartEndDates(
  meetingDate: string,
  startTime: string,
  endTime: string,
): { start: string; end: string } {
  const startDate = `${meetingDate}T${startTime}:00Z`; // Ignore time zones for now
  const endDate = `${meetingDate}T${endTime}:00Z`;

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
  const startTime = String(startDate).split("T")[1].substring(0, 5); // Extract time part
  const endTime = String(endDate).split("T")[1].substring(0, 5); // Extract time part

  return { dayOfWeek, meetingDate, startTime, endTime };
}

export function getFirstDateOfWeekIn1970(dayOfWeek: string): string {
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

  return date.toISOString().split("T")[0]; // Return the date in YYYY-MM-DD format
}

export function getProjectNameFromPath(path: string): string {
  // Split the path into an array of strings
  const pathArray = path.split("/");

  // Get the project name from the path
  const projectName = pathArray[pathArray.length - 1];

  return projectName;
}
