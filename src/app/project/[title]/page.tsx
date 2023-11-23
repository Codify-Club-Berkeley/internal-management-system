//Project page
"use client";

import React from "react";
// import ProjectCard from "./components/ProjectCard";
import { projectNameStringFormatter } from "../../../utils/helpers";
import AttendanceTracker from "../../components/AttendanceTracker";
import { UploadButton } from "../../../utils/uploadthing";
import { toast } from "react-toastify";
import { toastDefaultConfig } from "../../../utils/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Page({ params }: { params: { title: string } }) {
  const { data: projectData, isLoading } = useQuery({
    queryKey: ["project: " + params.title],
    queryFn: async () => {
      const response = await axios.get(
        "/api/projects/id?title=" + params.title,
      );
      return response.data;
    },
  });

  return (
    <div className="container">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <img
            src={projectData?.projectPictureUrl}
            className="h-40 w-40 rounded-full"
            alt="Project Image"
          />
          <UploadButton
            endpoint="projectImageUploader"
            input={{ projectId: projectData?.id }}
            className="ut-button:color-primary pt-4"
            onClientUploadComplete={(res) => {
              // Do something with the response
              toast.success("Uploaded successfully!", toastDefaultConfig);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              toast.error(
                `Upload failed with error ${error.message}`,
                toastDefaultConfig,
              );
            }}
          />
        </div>
        <h1 className="text-2xl font-bold">
          {projectNameStringFormatter(params.title)}
        </h1>
      </div>
      <div className="p-4">
        <AttendanceTracker />
      </div>
    </div>
  );
}
