import { Suspense } from "react";
import Sales from "./Sales";
import {
  getPemegangDokumenSales,
  getPemegangDokumenSalesPages,
} from "./action";
import SearchForm from "@/components/(dashboard)/SearchForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import PemegangDokumen from "@/components/(dashboard)/PemegangDokumen";
import Pagination from "@/components/(dashboard)/Pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pemegang Dokumen | Sales",
};

export default async function page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  return (
    <div className="mx-auto my-6 max-w-7xl">
      <div className="container mx-auto xl:px-0">
        <div className="flex flex-col">
          <div className="flex justify-center">
            {" "}
            <h1 className="text-2xl font-bold sm:text-nowrap mb-8 text-center">
              Dokumen Yang Dipegang Oleh Sales
            </h1>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
            <div className="flex gap-2 lg:gap-4 items-center w-full">
              <p className="hidden sm:flex font-bold text-lg">Search</p>
              <SearchForm />
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
          <div className="flex w-full justify-center">
            <PemegangDokumen />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Sales searchParams={searchParams || {}} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
