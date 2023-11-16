import React from "react";
import ProjectFlagsCard from "../components/project-manager/ProjectFlagsCard";
import MemberChips from "../components/project-manager/MemberChips";
import AddMemberDropdown from "../components/project-manager/AddMemberDropdown";

type ProjectSectionProps = {
  project: any;
  users: any;
};

export const ProjectSection: React.FC<ProjectSectionProps> = ({
  project,
  users,
}) => {
  return (
    <>
      {project && users ? (
        <div className="flex">
          <div>
            <ul>
              <li>
                <ProjectFlagsCard tags={["static", "temp", "tags"]} />
              </li>
              <li>Project created at {project.createdAt.toString()}</li>
              <li>Project updated at {project.updatedAt.toString()}</li>
              <li>Other information</li>
            </ul>
          </div>
          <div className="mx-3"></div>
          <div>
            <MemberChips
              membersofProject={project.members.map((member: any) => {
                return member.firstName + " " + member.lastName;
              })}
              membertoRemove=""
            />
            <AddMemberDropdown allMembers={users ? users : []} />
          </div>
        </div>
      ) : (
        <h1>null</h1>
      )}
    </>
  );
};
