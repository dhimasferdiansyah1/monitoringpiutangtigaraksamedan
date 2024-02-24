import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Suspense } from "react";

const image = [
  {
    id: 1,
    src: "/images/about/nextjs_logo.webp",
    alt: "nextjs_logo",
  },
  {
    id: 2,
    src: "/images/about/typescript_logo.webp",
    alt: "typescript_logo",
  },
  {
    id: 3,
    src: "/images/about/prisma_logo.webp",
    alt: "prisma_logo",
  },
  {
    id: 4,
    src: "/images/about/tailwindcss_logo.webp",
    alt: "tailwindcss_logo",
  },
  {
    id: 5,
    src: "/images/about/postgresql_logo.webp",
    alt: "postgresql_logo",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto mb-24 mt-10 max-w-7xl sm:mt-32">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
            Monitoring Piutang <br /> PT. Tigaraksa Satria, Tbk Cabang Medan
          </h1>
          <h3 className="text=xl text-muted-foreground lg:text-2xl">
            Dibangun dengan menggunakan
          </h3>
          <div className="mb-14 mt-4 flex flex-wrap justify-center gap-2">
            {image.map((image) => (
              <>
                <Suspense
                  key={image.id}
                  fallback={
                    <Skeleton className="h-[100px] w-[100px] rounded-md" />
                  }
                >
                  <div className="flex items-center justify-center rounded-md border p-4 shadow-sm dark:bg-zinc-900">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={100}
                      height={100}
                      className="h-auto w-auto"
                    />
                  </div>
                </Suspense>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
