// Home Page

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";
import SignInPrompt from "./sign-in/SignInPrompt";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center ">
      <SignedIn>
        <h1>signed in</h1>
      </SignedIn>
      <SignedOut>
        <SignInPrompt />
      </SignedOut>
    </div>
  );
}
