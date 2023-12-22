import React, { use, useState } from "react";
import ProjectFlagsCard from "./project-manager/ProjectFlagsCard";
import MemberChips from "./project-manager/MemberChips";
import { SearchBar } from "./project-manager/searchbar/SearchBar";
import { SearchResultsList } from "./project-manager/searchbar/SearchResultList";
import { SaveAdd } from "./project-manager/searchbar/SaveAdd";
import { AdminState } from "./adminState";
import { create } from "zustand";
import { set } from "zod";
import { useEffect } from "react";

type ProjectSectionProps = {
  project: any;
  users: any;
};

export const useAdminStore = create<AdminState>()((set) => ({
  edited: false,
  setEdited: (edited: boolean) => set({ edited }),
  submitting: false,
  setSubmitting: (submitting: boolean) => set({ submitting }),
  searchResults: [""],
  setSearchResults: (searchResults: string[]) => set({ searchResults }),
  searchResultsChecked: [""],
  setSearchResultsChecked: (searchResultsChecked: string[]) =>
    set({ searchResultsChecked }),
  projectMembers: [],
  setProjectMembers: (projectMembers: any[]) => set({ projectMembers }),
}));

export const ProjectSection: React.FC<ProjectSectionProps> = ({
  project,
  users,
}) => {
  // This state must be instantiated inside the component because the ProjectSection is rendered multiple times
  const {
    edited,
    setEdited,
    submitting,
    setSubmitting,
    searchResults,
    setSearchResults,
    searchResultsChecked,
    setSearchResultsChecked,
    projectMembers,
    setProjectMembers,
  } = useAdminStore();

  // Wrap in a useEffect to prevent infinite rerenders
  useEffect(() => {
    setProjectMembers(project.members);
    console.log("ProjectSection rendered");
  }, []);

  // const [searchResults, setSearchResults] = useState([""]);
  // const [searchResultsChecked, setSearchResultsChecked] = useState([""]);
  // const [projectMembers, setProjectMembers] = useState(project);

  return (
    <>
      {project && users ? (
        <div className="flex">
          <div>
            <ul className="space-y-2">
              <li className="flex">
                <ProjectFlagsCard tags={["static", "temp", "tags"]} />
              </li>
              <li>Project created at {project.createdAt.toString()}</li>
              <li>Project updated at {project.updatedAt.toString()}</li>
              <li>Other information</li>
              <br />
            </ul>
          </div>
          <div className="mx-3"></div>
          <div>
            <MemberChips />
            <SearchBar
              items={users.map((user: any) => {
                return user.firstName + " " + user.lastName;
              })}
              setSearchResults={setSearchResults}
            />
            <SearchResultsList
              results={searchResults}
              searchResultsChecked={searchResultsChecked}
              setSearchResultsChecked={setSearchResultsChecked}
            />
            <SaveAdd
              searchResultsChecked={searchResultsChecked}
              projectMembers={projectMembers}
              setSavedValues={setProjectMembers}
            />
          </div>
        </div>
      ) : (
        <h1>null</h1>
      )}
    </>
  );
};
