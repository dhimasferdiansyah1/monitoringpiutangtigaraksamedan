import { parseISO } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import {
  getJatuhTempoSemua,
  getJatuhTempoSemuaPages,
} from "@/actions/actionJatuhTempo";
import Semua from "./Semua";
import { Suspense } from "react";
import SearchForm from "@/components/(dashboard)/SearchForm";
import { Metadata } from "next";
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Jatuh Tempo Semua",
};

export default async function JatuhTempoSemuaPage({
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
            Jatuh Tempo Rentang Hari Ini / Lewat
          </h1>
          <div className="flex ju</div>stify-end"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 lg:gap-4 items-center w-full">
            <p className="hidden sm:flex font-bold text-lg">Search</p>
            <SearchForm />
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Semua searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
