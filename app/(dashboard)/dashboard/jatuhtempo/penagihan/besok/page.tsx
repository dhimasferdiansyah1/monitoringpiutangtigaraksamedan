import SearchForm from "@/components/(dashboard)/SearchForm";
import { Suspense } from "react";
import Besok from "./Besok";
import { Metadata } from "next";
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Jatuh Tempo Penagihan Besok",
};

export default async function JatuhTempoBesokPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    search?: string;
  };
}) {
  return (
    <div className="mx-auto my-6 max-w-7xl">
      <div className="container mx-auto xl:px-0">
        <div className="flex flex-col">
          <h1 className="my-4 text-center text-2xl font-bold">
            Jatuh Tempo Penagihan Rentang Besok
          </h1>
          <div className="flex ju</div>stify-end"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 lg:gap-4 items-center w-full">
            <p className="hidden sm:flex font-bold text-lg">Search</p>
            <SearchForm placeholder="Cari No. Purchase Order/ Delivery Note/ Faktur..." />
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Besok searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
