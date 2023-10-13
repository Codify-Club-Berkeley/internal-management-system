import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center bg-slate-400 h-screen">
      <SignIn />
    </div>
  );
}
