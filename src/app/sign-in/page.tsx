import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center bg-background h-screen">
      <SignIn />
      <br></br>
      <h2>If you do not already have an account, click sign up</h2>
    </div>
  );
}
