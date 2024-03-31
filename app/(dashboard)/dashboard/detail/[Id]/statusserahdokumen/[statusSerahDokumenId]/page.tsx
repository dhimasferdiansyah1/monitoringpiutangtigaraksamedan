import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import TambahStatusSerahDokumen from "@/components/(dashboard)/detail/statusserahdokumen/TambahStatusSerahDokumen";
import { getStatusSerahDokumenUniqe } from "@/actions/actionStatusSerahDokumen";

export async function generateMetadata({
  params,
}: {
  params: { statusSerahDokumenId: string };
}) {
  const id = params.statusSerahDokumenId;
  const statusSerah = await getStatusSerahDokumenUniqe(id);

  if (!statusSerah) {
    return { notFound: true };
  }

  return {
    title: `${statusSerah.no_po} | Status Serah Dokumen`, // Set the title from fetched data
  };
}

export default async function statusSerahDokumenDetail({
  params,
}: {
  params: { statusSerahDokumenId: string };
}) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Suspense
            fallback={
              <Skeleton className="my-8 h-[400px] w-[200px] lg:h-[600px] lg:w-[500px]" />
            }
          >
            <TambahStatusSerahDokumen params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
