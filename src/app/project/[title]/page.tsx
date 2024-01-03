// Project page
"use client";

import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

import { ProjectWithMembersLeadsAndFullMeetings } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

import { projectNameStringFormatter } from "../../../utils/helpers";
import { UploadButton } from "../../../utils/uploadthing";
import AttendanceTable from "./attendance tracker/AttendanceTable";
import DefaultMeetingDisplay from "./default meetings/DefaultMeetingDisplay";

export default function Page({ params }: { params: { title: string } }) {
  const { data: projectData, isLoading } = useQuery({
    queryKey: ["project: " + params.title],
    queryFn: async () => {
      const response = await axios.get(
        "/api/projects/id?title=" + params.title,
      );
      return response.data as ProjectWithMembersLeadsAndFullMeetings;
    },
  });

  return (
    <div className="container">
      <div className="flex flex-row">
        <div className="flex-grow">
          <h1 className="text-2xl font-bold">
            {projectNameStringFormatter(params.title)}
          </h1>

          <div className="p-4">
            <DefaultMeetingDisplay
              startTime={"09:00 AM"}
              endTime={"10:00 AM"}
              dayOfWeek={"Wednesday"}
              location={"Main Conference Hall"}
              name={"Weekly Project Status Meeting"}
            />
            {isLoading || !projectData ? null : (
              <AttendanceTable
                Meetings={projectData.meetings}
                Members={projectData.members}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={projectData?.projectPictureUrl}
            className="m-3 h-40 w-40 border bg-gray-200 object-contain p-2 shadow-md "
            alt="Project Image"
          />
          <UploadButton
            endpoint="projectImageUploader"
            input={{ projectId: projectData?.id }}
            className="ut-button:color-primary pt-4"
            onClientUploadComplete={(res) => {
              // Do something with the response
              toast.success("Uploaded successfully!");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              toast.error(`Upload failed with error ${error.message}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
