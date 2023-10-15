"use client";

// The page in which you view a user's profile.
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UploadButton } from "../../../utils/uploadthing";
import { User } from "@prisma/client";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import ProfileDataTable from "./ProfileDataTable";

export default function Page({ params }: { params: { slug: string } }) {
  // If the user is the owner of the profile, they can edit it
  const [isOwner, setIsOwner] = React.useState(false);
  const queryClient = useQueryClient();

  // const { mutate: createProj } = useMutation({
  //   mutationFn: async () => {
  //     await axios.post("/api/projects", {
  //       title: "test proj 2",
  //     });
  //   },
  // });

  // Call the user of the slug in the url
  // Returns null if the user doesn't exist
  const { data, isLoading } = useQuery({
    queryKey: ["profile: " + params.slug],
    queryFn: async () => {
      const response = await axios.get("/api/user/" + params.slug);
      return response.data as User;
    },
  });

  // Because we have multiple queries, we need to rename data and isLoading
  const { data: currentUser, isLoading: userLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await axios.get("/api/user/me");
      return response.data as User;
    },
  });

  // If the user is logged in, check if they are the owner of the profile
  React.useEffect(() => {
    if (currentUser && data) {
      setIsOwner(currentUser.id === data.id);
    }
  }, [currentUser, data]);

  // If it is loading, return a loading page
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If the user doesn't exist, return a 404 page
  if (!data && !isLoading) {
    return <div>User does not exist</div>;
  }

  return (
    <div>
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
      {/**Todo make this mobile responsive */}
      <div className="flex flex-row">
        <div className="flex flex-1 flex-col p-4">
          <div className="flex flex-row mb-3 ">
            <img
              src={data.profilePictureUrl}
              alt="no profile picture uploaded"
              className="rounded-full w-36 h-36"
            />
            <div className="flex flex-col ml-5">
              <h1 className="text-3xl mb-2">
                {data.firstName + " " + data.lastName}
              </h1>
              <h2 className="text-xl">{data.roles[0]}</h2>
              {isOwner && <Button className="mt-2">Edit Profile</Button>}
            </div>
          </div>
          <ProfileDataTable userData={data} />
        </div>
        <div className="flex flex-1 flex-col p-4"></div>
      </div>
    </div>
  );
}
