//Project page
"use client";

import React from "react";
// import ProjectCard from "./components/ProjectCard";
import { projectNameStringFormatter } from "../../../utils/helpers";
import AttendanceTracker from "../../components/AttendanceTracker";

export default function Page({ params }: { params: { title: string } }) {
  // Query the project based on the title
  // If the project exists, populate the page with the data,
  // Otherwise, return a 404 page
  return (
    <div className="container">
      <h1 className="text-2xl font-bold">
        {projectNameStringFormatter(params.title)}
      </h1>
      <div className="p-4">
        <AttendanceTracker />
      </div>
    </div>
  );
}
