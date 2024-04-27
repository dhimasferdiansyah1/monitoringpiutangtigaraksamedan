export const revalidate = 0;
import dynamic from "next/dynamic";
const StatusSerahDokumenList = dynamic(
  () =>
    import(
      "@/components/(dashboard)/statusserahdokumen/StatusSerahDokumenList"
    ),
  {
    loading: () => <SkeletonCustomer />,
  }
);
import { Card } from "@/components/ui/card";
import SkeletonCustomer from "@/components/ui/skeleton-customer";
import { Suspense } from "react";
import { Metadata } from "next";
import ExportStatusSerahDokumen from "@/components/(dashboard)/statusserahdokumen/ExportStatusSerahDokumen";
import { getStatusSerahDokumenList } from "@/actions/actionStatusSerahDokumen";
import { DateRangeFilter } from "@/components/(dashboard)/piutangselesai/DateRangeFilter";
import { zonedTimeToUtc } from "date-fns-tz";

export const metadata: Metadata = {
  title: "Status Serah Dokumen",
};

export default async function StatusSerahDokumenPage({
  searchParams,
}: {
  searchParams: {
    startDate?: string; // Receive startDate
    endDate?: string; // Receive endDate
  };
}) {
  const startDateUTC = searchParams?.startDate
    ? new Date(searchParams.startDate)
    : undefined; // Parse date string
  const endDateUTC = searchParams?.endDate
    ? new Date(searchParams.endDate)
    : undefined; // Parse date string

  const startDate = startDateUTC
    ? zonedTimeToUtc(startDateUTC, "Asia/Jakarta")
    : undefined;
  const endDate = endDateUTC
    ? zonedTimeToUtc(endDateUTC, "Asia/Jakarta")
    : undefined;
  const statusList = await getStatusSerahDokumenList(startDate, endDate);
  return (
    <div className="mx-auto max-w-7xl my-6">
      <div className="container mx-auto px-0">
        <div className="flex items-center justify-center">
          <Card className="my-4 overflow-x-auto p-4 w-full lg:overflow-x-visible">
            <div className="flex w-auto items-center justify-end">
              <div className="flex w-full">
                <h1 className="vdeee3 ml-4 text-left font-bold lg:text-2xl">
                  Status Serah Dokumen
                </h1>
              </div>
              <ExportStatusSerahDokumen statusSerahDokumenList={statusList} />
            </div>
            <div className="flex flex-col gap-2">
              <Suspense fallback={<SkeletonCustomer />}>
                <StatusSerahDokumenList searchParams={searchParams} />
              </Suspense>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
