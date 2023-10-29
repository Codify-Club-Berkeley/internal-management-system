import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center bg-background h-screen">
      <SignUp />
      <br></br>
      <h2>If you already have an account, click sign in</h2>
    </div>
  );
}
