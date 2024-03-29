import FormTambahPurchaseOrder from "@/components/(dashboard)/tambahpurchaseorder/FormTambahPurchaseOrder";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function TambahPurchaseOrderPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Suspense
            fallback={
              <Skeleton className="w-[300px] h-[600px] mt-8 lg:w-[512px] lg:h-[512px]" />
            }
          >
            <FormTambahPurchaseOrder />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
