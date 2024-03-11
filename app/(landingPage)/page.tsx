import { Button } from "@/components/ui/button";
import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs";

export default async function LandingPage() {
  const { userId } = auth();
  const user = await currentUser();
  return (
    <main className="mx-auto my-12 max-w-7xl">
      <div className="container mx-auto">
        <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
          <Image
            src="/logo.webp"
            alt="Logo Pt. Tigaraksa Satria, Tbk"
            width={100}
            height={100}
            className="h-auto w-auto"
          />
          <span className="rounded-md border border-yellow-300 bg-yellow-200 px-2 py-1 text-sm text-yellow-900 opacity-50">
            Versi Beta
          </span>
          <div className=" text-center text-2xl font-extrabold sm:w-2/4 lg:text-5xl">
            <h1>Selamat Datang di Monitoring Piutang</h1>
          </div>
          <div className="text-md text-center font-normal text-muted-foreground sm:w-2/4 lg:text-2xl">
            <p>Dapatkan informasi terkini mengenai progres piutang</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            {userId && (
              <a href="/dashboard" className="my-2">
                <Button variant="default" className="px-12">
                  Dashboard
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
