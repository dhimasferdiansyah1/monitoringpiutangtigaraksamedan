import { getLaporanList } from "@/actions/actionLaporan";
import LaporanList from "@/components/(dashboard)/laporan/LaporanList";
import { Card } from "@/components/ui/card";
import SkeletonCustomer from "@/components/ui/skeleton-customer";
import React, { Suspense } from "react";

export default async function page({
  searchParams,
}: {
  searchParams: {
    month?: string;
    year?: string;
  };
}) {
  const selectedMonth = parseInt(searchParams?.month || "", 10) || undefined;
  const selectedYear =
    parseInt(searchParams?.year || "", 10) || new Date().getFullYear();

  const { status, AR, SALES, OD } = await getLaporanList({
    month: selectedMonth,
    year: selectedYear,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set jam today to 00:00:00

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Set jam tomorrow to 00:00:00

  return (
    <div className="mx-auto max-w-7xl my-6">
      <div className="container mx-auto px-0">
        <div className="flex items-center justify-center">
          <Card className="my-4 overflow-x-auto p-4 w-full lg:overflow-x-visible">
            <div className="flex w-auto items-center justify-end">
              <div className="flex w-full">
                <h1 className="vdeee3 ml-4 text-left font-bold lg:text-2xl">
                  Laporan
                </h1>
              </div>
              {/* <ExportStatusSerahDokumen statusSerahDokumenList={statusList} /> */}
            </div>
            <div className="flex flex-col gap-2">
              <Suspense fallback={<SkeletonCustomer />}>
                <LaporanList searchParams={searchParams} />
              </Suspense>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
