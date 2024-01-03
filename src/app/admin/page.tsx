// Admin panel
"use client";

import React from "react";
import ProjectManager from "./ProjectManager";
import NewProjectModal from "./NewProjectModal";

export default function Page({ params }: { params: { title: string } }) {
  // Query the project based on the title
  // If the project exists, populate the page with the data,
  // Otherwise, return a 404 page
  return (
    <div className="container">
      <h1 className="text-2xl font-bold">{params.title}</h1>
      <div className="flex flex-row-reverse">
        <NewProjectModal />
      </div>
      <div className="p-4">
        <ProjectManager />
      </div>
    </div>
  );
}
