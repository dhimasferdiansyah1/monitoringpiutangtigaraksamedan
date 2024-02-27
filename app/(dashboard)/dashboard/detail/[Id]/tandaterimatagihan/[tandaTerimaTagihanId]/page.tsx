import React, { Suspense } from "react";
import { getPurchaseOrderUniqe } from "@/actions/actionPurchaseOrder";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import FormDetailPurchaseOrder from "@/components/(dashboard)/detail/purchaseorder/FormDetailPurchaseOrder";
import { getTandaTerimaTagihanDetail } from "@/actions/actionTandaTerimaTagihan";
import TambahTerimaTagihan from "@/components/(dashboard)/detail/tandaterimatagihan/TambahTandaTerimaTagihan";

export default async function tandaTerimaTagihanDetail({
  params,
}: {
  params: { tandaTerimaTagihanId: string };
}) {
  const id = params.tandaTerimaTagihanId;
  const tandaTerimaTagihan = await getTandaTerimaTagihanDetail(id);

  if (!tandaTerimaTagihan) {
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
            <TambahTerimaTagihan tandaTerimaTagihanId={tandaTerimaTagihan} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
