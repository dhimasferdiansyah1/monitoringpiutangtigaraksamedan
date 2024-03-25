export const dynamic = "force-dynamic";
export const revalidate = 0;
import CustomerList from "@/components/(dashboard)/customer/CustomerList";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonCustomer from "@/components/ui/skeleton-customer";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Customer",
};

export default function CustomerPage() {
  return (
    <div className="mx-auto max-w-7xl my-6">
      <div className="container mx-auto px-0">
        <div className="flex items-center justify-center">
          <Card className="my-4 overflow-x-auto p-4 w-full lg:overflow-x-visible">
            <div className="flex w-auto items-center justify-end">
              <div className="flex w-full">
                <h1 className="vdeee3 ml-4 text-left font-bold lg:text-2xl">
                  Data Customer
                </h1>
              </div>
              <Link href="/dashboard/customer/tambahcustomer">
                <Button variant="secondary" className="flex gap-2">
                  <Plus className="h-5 w-5" />
                  Tambah Customer
                </Button>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Suspense fallback={<SkeletonCustomer />}>
                <CustomerList />
              </Suspense>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
