import React, { Suspense } from "react";
import { getPurchaseOrderUniqe } from "@/actions/actionPurchaseOrder";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import FormDetailPurchaseOrder from "@/components/(dashboard)/detail/purchaseorder/FormDetailPurchaseOrder";
import TambahStatusSerahDokumen from "@/components/(dashboard)/detail/statusserahdokumen/TambahStatusSerahDokumen";

export default async function statusSerahDokumenDetail({
  params,
}: {
  params: { purchaseOrderId: string };
}) {
  const id = params.purchaseOrderId;
  const purchaseOrder = await getPurchaseOrderUniqe(id);

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
            <TambahStatusSerahDokumen purchaseOrderId={purchaseOrder} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
