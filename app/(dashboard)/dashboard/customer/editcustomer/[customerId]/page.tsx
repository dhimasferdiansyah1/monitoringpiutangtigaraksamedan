import { getCustomerUniqe } from "@/actions/actionCustomer";
import FormEditCustomer from "@/components/(dashboard)/customer/editcustomer/FormEditCustomer";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { customerId: string };
}) {
  const id = params.customerId;
  const customer = await getCustomerUniqe(id);

  if (!customer) {
    return { notFound: true };
  }

  return {
    title: `${customer.customer_name} | Edit Customer`, // Set the title from fetched data
  };
};

export default async function EditCustomerPage({
  params,
}: {
  params: { customerId: string };
}) {
  const id = params.customerId;
  const customer = await getCustomerUniqe(id);

  if (!customer) {
    notFound();
  }
  return (
    <div className="mx-auto max-w-7xl">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Suspense
            fallback={
              <Skeleton className="w-[300px] h-[600px] mt-8 lg:w-[512px] lg:h-[512px]" />
            }
          >
            <FormEditCustomer customer={customer} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
