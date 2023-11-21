import React, { useState } from "react";
import ProjectFlagsCard from "../components/project-manager/ProjectFlagsCard";
import MemberChips from "../components/project-manager/MemberChips";
import { SearchBar } from "../components/project-manager/searchbar/SearchBar";
import { SearchResultsList } from "../components/project-manager/searchbar/SearchResultList";
import { SaveAdd } from "../components/project-manager/searchbar/SaveAdd";

type ProjectSectionProps = {
  project: any;
  users: any;
};

export const ProjectSection: React.FC<ProjectSectionProps> = ({
  project,
  users,
}) => {
  const [searchResults, setSearchResults] = useState([""]);
  const [searchResultsChecked, setSearchResultsChecked] = useState([""]);
  const [projectMembers, setProjectMembers] = useState(project);

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
            <MemberChips
              membersofProject={projectMembers.members.map((member: any) => {
                return member.firstName + " " + member.lastName;
              })}
              membertoRemove=""
              setProjectMembers={setProjectMembers}
            />
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
