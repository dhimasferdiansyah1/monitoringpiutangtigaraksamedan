import { Suspense } from "react";
import PiutangSelesaiList from "@/components/(dashboard)/piutangselesai/PiutangSelesaiList";
import SearchForm from "@/components/(dashboard)/SearchForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default async function page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
    startDate?: string; // Add startDate
    endDate?: string; // Add endDate
  };
}) {
  return (
    <div className="mx-auto my-6 max-w-7xl">
      <div className="container mx-auto xl:px-0">
        <div className="flex flex-col">
          <div className="flex justify-center">
            {" "}
            <h1 className="text-2xl font-bold text-nowrap mb-8">
              Piutang Selesai
            </h1>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
            <div className="flex gap-2 lg:gap-4 items-center w-full">
              <p className="hidden sm:flex font-bold text-lg">Search</p>
              <SearchForm placeholder="Cari No. Purchase Order/ Delivery Note/ Faktur..." />
            </div>
            <div className="flex justify-end w-full md:w-fit">
              <Link href="/dashboard/tambahpurchaseorder">
                <Button className="flex gap-2" variant="default">
                  <PlusCircle className="w-4 h-4" />
                  Tambah
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex w-full justify-center"></div>{" "}
          {/* Wrap with the provider */}
          <Suspense fallback={<div>Loading...</div>}>
            <PiutangSelesaiList searchParams={searchParams || {}} />
          </Suspense>
          {/* Wrap with the provider */}
        </div>
      </div>
    </div>
  );
}
