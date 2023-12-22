import { create } from "zustand";

export type AdminState = {
  edited: boolean;
  setEdited: (editing: boolean) => void;
  submitting: boolean;
  setSubmitting: (submitting: boolean) => void;
  searchResults: string[];
  setSearchResults: (searchResults: string[]) => void;
  searchResultsChecked: string[];
  setSearchResultsChecked: (searchResultsChecked: string[]) => void;
  projectMembers: any[];
  setProjectMembers: (projectMembers: any[]) => void;
};
