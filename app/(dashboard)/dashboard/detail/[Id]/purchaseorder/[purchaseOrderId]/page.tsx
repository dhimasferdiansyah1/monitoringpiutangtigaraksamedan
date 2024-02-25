import React, { Suspense } from "react";
import { getPurchaseOrderUniqe } from "@/actions/actionPurchaseOrder";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import FormDetailPurchaseOrder from "@/components/(dashboard)/detail/purchaseorder/FormDetailPurchaseOrder";

export default async function purchaseOrderDetail({
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
            <FormDetailPurchaseOrder purchaseOrderId={purchaseOrder} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
