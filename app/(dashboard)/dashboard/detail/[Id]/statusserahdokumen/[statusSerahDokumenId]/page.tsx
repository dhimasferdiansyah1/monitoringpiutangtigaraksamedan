import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import TambahStatusSerahDokumen from "@/components/(dashboard)/detail/statusserahdokumen/TambahStatusSerahDokumen";
import { getStatusSerahDokumenUniqe } from "@/actions/actionStatusSerahDokumen";

export default async function statusSerahDokumenDetail({
  params,
}: {
  params: { statusSerahDokumenId: string };
}) {
  const id = params.statusSerahDokumenId;
  const purchaseOrder = await getStatusSerahDokumenUniqe(id);

  if (!purchaseOrder) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Suspense
            fallback={
              <Skeleton className="my-8 h-[400px] w-[200px] lg:h-[600px] lg:w-[500px]" />
            }
          >
            {/* <TambahStatusSerahDokumen statusSerahDokumenId={purchaseOrder} /> */}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
