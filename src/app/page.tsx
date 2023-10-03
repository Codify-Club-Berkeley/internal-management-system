// Home Page

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <SignedIn>
        <UserButton afterSignOutUrl="localhost:3000" />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}
