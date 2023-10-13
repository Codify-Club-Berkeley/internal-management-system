"use client";

// The page in which you view a user's profile.
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function Page({ params }: { params: { slug: string } }) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.put(
        "http://localhost:3000/api/user/user_2WgCdUQmElgScEox4Gks81h82mn?linkedInURL=https://www.linkedin.com/in/aidan-sunbury/&phoneNum=9254515546",
      );
    },
  });

  return (
    <div>
      Page
      <h2>{params.slug}</h2>
      {/* Button that when triggers the given API call in the mutation function */}
      <button
        onClick={() => {
          mutate();
        }}
      >
        {" "}
        <h1>hi</h1>
      </button>
    </div>
  );
}
