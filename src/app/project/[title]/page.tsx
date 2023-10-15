"use client";

import React from "react";

export default function Page({ params }: { params: { title: string } }) {
  // Query the project based on the title
  // If the project exists, populate the page with the data,
  // Otherwise, return a 404 page
  return <div>{params.title}</div>;
}
