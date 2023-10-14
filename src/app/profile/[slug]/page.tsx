"use client";

// The page in which you view a user's profile.
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UploadButton } from "../../../utils/uploadthing";
import { User } from "@prisma/client";

export default function Page({ params }: { params: { slug: string } }) {
  const queryClient = useQueryClient();
  // const { mutate, isLoading } = useMutation({
  //   mutationFn: async () => {
  //     await axios.put(
  //       "http://localhost:3000/api/user/user_2WgCdUQmElgScEox4Gks81h82mn?linkedInUrl=https://www.linkedin.com/in/aidan-sunbury/&phoneNum=9254515546",
  //     );
  //   },
  // });

  // const { mutate: createProj } = useMutation({
  //   mutationFn: async () => {
  //     await axios.post("/api/projects", {
  //       title: "test proj 2",
  //     });
  //   },
  // });

  // Todo call the user of the slug in the url
  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await axios.get("/api/user/me");
      return response.data as User;
    },
  });

  return (
    <div>
      Page
      <h2>{params.slug}</h2>
      {/* Button that when triggers the given API call in the mutation function */}
      {/* <UploadButton
        endpoint="profileImageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /> */}
    </div>
  );
}
