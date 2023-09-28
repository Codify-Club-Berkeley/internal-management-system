// Page in which you are redirected after sign in / sign up
// Validates that the user has a berkeley email and is authorized to make an account
// If the user does not have a berkeley email or is not authorized to make an account,
// then their account is deleted and they are redirected to the home page

import { useRouter } from "next/router";
import { useEffect } from "react";
import { currentUser } from "@clerk/nextjs";

export default async function ProfileValidate() {
  const user = await currentUser();
  const router = useRouter();

  // If the user is not signed in, redirect to the home page
  useEffect(() => {
    if (user == null) {
      router.push("/sign-in");
    }
    const email = user?.emailAddresses[0].emailAddress; // Should only have one email address

    // If the user does not have a berkeley email, delete their account and redirect to the home page
    const berkeleyEmailDomain = "berkeley.edu";

    if (!email?.includes(berkeleyEmailDomain)) {
      // Tell the home page that it was redirected from a failed login so it can display an alert
      router.push("/?error=berkeley-email");
      // Todo Delete the user's account
    }

    // Todo implement blocklist logic

    // Todo check if the given user already exists within the database, and if not, create them

    // Send to the profile page of the user

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
