import { Button } from "@/components/ui/button";
import { SignUp } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk",
};

export default async function Page() {
  // const { userId } = auth();
  // const user = await currentUser();

  return (
    <div className="flex justify-center min-h-screen pt-14">
      {/* {userId && }
      {!userId && ( */}
      <div className="flex flex-col gap-2 items-center justify-center">
        <p className=" text-muted-foreground">
          <SignUp />
          Akses terbatas, hanya bisa dilakukan oleh pemilik website!
        </p>
        <Link href="/">
          <Button variant="default">Kembali</Button>
        </Link>
      </div>
      {/* )} */}
    </div>
  );
}
