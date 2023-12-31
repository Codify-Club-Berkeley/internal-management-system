import React, { createContext, Dispatch, useContext, useReducer } from "react";

import { UserMinimized } from "../../utils/types";

export type AdminStateType = {
  members: UserMinimized[];
  leads: UserMinimized[];
  searchResults: UserMinimized[];
  searchResultsChecked: UserMinimized[];
  searchInput: string;
  edited: boolean;
};

// Define types for actions
type AdminAction =
  | { type: "ADD_MEMBER"; payload: UserMinimized }
  | { type: "REMOVE_MEMBER"; payload: UserMinimized }
  | { type: "ADD_LEAD"; payload: UserMinimized }
  | { type: "REMOVE_LEAD"; payload: UserMinimized }
  | { type: "SET_SEARCH_RESULTS"; payload: UserMinimized[] }
  | { type: "SET_SEARCH_INPUT"; payload: string }
  | { type: "TOGGLE_SEARCH_RESULT"; payload: UserMinimized } // user object
  | { type: "ADD_MEMBERS" }
  | { type: "RESET_EDITED" };

// Reducer function
function adminReducer(
  state: AdminStateType,
  action: AdminAction,
): AdminStateType {
  switch (action.type) {
    case "ADD_MEMBER":
      const isMemberAlreadyAdded = state.members.some(
        (member) => member.id === action.payload.id,
      );
      if (isMemberAlreadyAdded) return state;
      return {
        ...state,
        members: [...state.members, action.payload],
        edited: true,
      };
    case "REMOVE_MEMBER":
      return {
        ...state,
        members: state.members.filter(
          (member) => member.id !== action.payload.id,
        ),
        edited: true,
      };
    case "ADD_LEAD":
      return {
        ...state,
        leads: [...state.leads, action.payload],
        edited: true,
      };
    case "REMOVE_LEAD":
      return {
        ...state,
        leads: state.leads.filter((lead) => lead.id !== action.payload.id),
        edited: true,
      };
    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };
    case "TOGGLE_SEARCH_RESULT":
      const isAlreadyChecked = state.searchResultsChecked.some(
        (user) => user.id === action.payload.id,
      );
      return {
        ...state,
        searchResultsChecked: isAlreadyChecked
          ? state.searchResultsChecked.filter(
              (user) => user.id !== action.payload.id,
            )
          : [...state.searchResultsChecked, action.payload],
      };
    case "ADD_MEMBERS":
      const uniqueNewMembers = state.searchResultsChecked.filter(
        (searchResult) =>
          !state.members.some((member) => member.id === searchResult.id),
      );
      return {
        ...state,
        members: [...state.members, ...uniqueNewMembers],
        searchResultsChecked: [],
        edited: true,
      };
    case "SET_SEARCH_INPUT":
      return { ...state, searchInput: action.payload };
    case "RESET_EDITED":
      return { ...state, edited: false };
    default:
      return state;
  }
}

// Create the context
const AdminContext = createContext<
  { state: AdminStateType; dispatch: Dispatch<AdminAction> } | undefined
>(undefined);

// Provider component
const AdminProvider: React.FC = ({ children, members, leads }: any) => {
  // Initial state
  const initialState: AdminStateType = {
    members: members,
    leads: leads,
    searchResults: [],
    searchResultsChecked: [],
    searchInput: "",
    edited: false,
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook for using the admin context
const useAdmin = (): {
  state: AdminStateType;
  dispatch: Dispatch<AdminAction>;
} => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export { AdminProvider, useAdmin };
