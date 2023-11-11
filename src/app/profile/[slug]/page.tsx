"use client";

// The page in which you view a user's profile.
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UploadButton } from "../../../utils/uploadthing";
import { User } from "@prisma/client";
import { Button } from "@nextui-org/react";
import ProfileDataTable from "./ProfileDataTable";
import { useProfileStore } from "./pageState";
import { toast } from "react-toastify";
import { toastDefaultConfig } from "../../../utils/constants";

export default function Page({ params }: { params: { slug: string } }) {
  // Get the editing and submitting state from the shared store
  const { editing, setEditing, submitting, setSubmitting } = useProfileStore();

  // If the user is the owner of the profile, they can edit it
  const [isOwner, setIsOwner] = useState(false);

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
  useEffect(() => {
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
      {/**Todo make this mobile responsive */}
      <div className="flex flex-row">
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-3 flex flex-row ">
            <div className="flex flex-col">
              {data.profilePictureUrl && (
                <img
                  src={data?.profilePictureUrl}
                  alt="no profile picture uploaded"
                  className="h-36 w-36 rounded-full"
                />
              )}
              {editing && (
                <UploadButton
                  endpoint="profileImageUploader"
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
              )}
            </div>
            <div className="ml-5 flex flex-col">
              <h1 className="mb-2 text-3xl">
                {data.firstName + " " + data.lastName}
              </h1>
              <h2 className="text-xl">{data.roles[0]}</h2>
              {/* If the use is the owner of the profile, display an edit profile button */}
              {/* todo Simply disable the button when profile is inactive */}
              {isOwner &&
                (isOwner && editing ? (
                  <Button
                    className="mt-2"
                    onPress={() => {
                      setSubmitting(true);
                    }}
                  >
                    Save Changes
                  </Button>
                ) : (
                  <Button
                    className="mt-2"
                    onPress={() => {
                      setEditing(!editing);
                    }}
                  >
                    Edit Profile
                  </Button>
                ))}
            </div>
          </div>
          <ProfileDataTable userData={data} />
        </div>
        <div className="flex flex-1 flex-col p-4"></div>
      </div>
    </div>
  );
}
