// AttendanceContext.tsx
import React, { createContext, useReducer, useContext } from "react";
import { Meeting } from "@prisma/client";
import { UserMinimized } from "@/utils/types";

type AttendanceStatus = "present" | "absent" | "excused";

// The state will map user IDs to their attendance status
type AttendanceState = {
  attendance: Record<string, AttendanceStatus>;
  edited: boolean;
  meeting: Meeting;
};

// Actions for the attendance context
type AttendanceAction =
  | {
      type: "MARK_STATUS";
      payload: { userId: string; status: AttendanceStatus };
    }
  | { type: "MARK_ALL_AS_PRESENT"; payload: UserMinimized[] };

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
      const allPresent = action.payload.reduce(
        (acc, user) => {
          acc[user.id] = "present";
          return acc;
        },
        {} as Record<string, AttendanceStatus>,
      );
      return {
        ...state,
        attendance: allPresent,
        edited: true,
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
const AttendanceProvider: React.FC = ({ children, members, meeting }: any) => {
  // Initial state for the context
  const initialState: AttendanceState = {
    attendance: {},
    edited: false,
    meeting: meeting,
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
