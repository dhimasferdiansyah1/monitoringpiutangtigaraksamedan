import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar",
};
export default function Page() {
  return (
    <div className="flex justify-center min-h-screen pt-14">
      <SignIn />
    </div>
  );
}
