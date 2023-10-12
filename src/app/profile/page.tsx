"use client";
// Page in which you are redirected after sign in / sign up
// Validates that the user has a berkeley email and is authorized to make an account
// If the user does not have a berkeley email or is not authorized to make an account,
// then their account is deleted and they are redirected to the home page

import { useEffect, useState, useDebugValue } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "next/navigation";

// TODO verify if the sign up / sign in redirects are based on if the user is created for the first time,
// TODO or if it is based on if they clicked sign up / sign in

export default function ProfileValidate() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["validate"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:3000/api/user/validate",
      );
      console.log(response.data);
      return response.data;
    },
  });
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  if (!isLoading) {
  }

  return (
    <div>
      <h1>got data!</h1>
      <h2>{JSON.stringify(data)}</h2>
    </div>
  );
}
