import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";
import FormTambahCustomer from "@/components/(dashboard)/customer/tambahcustomer/FormTambahCustomer";

export default function TambahCustomerPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Suspense
            fallback={
              <Skeleton className="w-[300px] h-[600px] mt-8 lg:w-[512px] lg:h-[512px]" />
            }
          >
            <FormTambahCustomer />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
