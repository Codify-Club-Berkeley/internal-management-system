// AttendanceContext.tsx
import React, { createContext, useContext, useReducer } from "react";

import { UserMinimized } from "@/utils/types";
import { Meeting, User } from "@prisma/client";

export type AttendanceStatus = "present" | "absent" | "excused" | "undefined";

// The state will map user IDs to their attendance status
type AttendanceState = {
  attendance: Record<string, AttendanceStatus>;
  edited: boolean;
  meeting: Meeting;
  members: UserMinimized[];
};

// Actions for the attendance context
type AttendanceAction =
  | {
      type: "MARK_STATUS";
      payload: { userId: string; status: AttendanceStatus };
    }
  | { type: "MARK_ALL_AS_PRESENT" }
  | { type: "RESET_EDITED" };

// The reducer function for attendance changes
function attendanceReducer(
  state: AttendanceState,
  action: AttendanceAction,
): AttendanceState {
  switch (action.type) {
    case "MARK_STATUS":
      return {
        ...state,
        attendance: {
          ...state.attendance,
          [action.payload.userId]: action.payload.status,
        },
        edited: true,
      };
    case "MARK_ALL_AS_PRESENT":
      const allMembersPresent = Object.keys(state.attendance).reduce(
        (acc, userId) => {
          acc[userId] = "present";
          return acc;
        },
        {} as Record<string, AttendanceStatus>,
      );
      return {
        ...state,
        attendance: allMembersPresent,
        edited: true,
      };
    case "RESET_EDITED":
      return {
        ...state,
        edited: false,
      };
    default:
      return state;
  }
}

// Create the context
const AttendanceContext = createContext<
  | {
      state: AttendanceState;
      dispatch: React.Dispatch<AttendanceAction>;
    }
  | undefined
>(undefined);

// Provider component for the AttendanceContext
const AttendanceProvider: React.FC = ({
  children,
  members,
  meeting,
}: {
  children: React.ReactNode;
  members: UserMinimized[];
  meeting: Meeting;
}) => {
  // Iterate through the absent, present, and excused arrays within the meeting and add them to the attendance object
  const attendance: Record<string, AttendanceStatus> = {};
  meeting.absent.forEach((user) => {
    attendance[user.id] = "absent";
  });
  meeting.present.forEach((user) => {
    attendance[user.id] = "present";
  });
  meeting.excused.forEach((user) => {
    attendance[user.id] = "excused";
  });

  // Any member that is not in the attendance object is marked with their attendance status as "undefined"
  members.forEach((user) => {
    if (!attendance[user.id]) {
      attendance[user.id] = "undefined";
    }
  });

  // Initial state for the context
  const initialState: AttendanceState = {
    attendance,
    edited: false,
    meeting,
    members: usersMinimizer(members),
  };

  const [state, dispatch] = useReducer(attendanceReducer, initialState);

  return (
    <AttendanceContext.Provider value={{ state, dispatch }}>
      {children}
    </AttendanceContext.Provider>
  );
};

// Hook to use the AttendanceContext
const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error("useAttendance must be used within an AttendanceProvider");
  }
  return context;
};

export { AttendanceProvider, useAttendance };
