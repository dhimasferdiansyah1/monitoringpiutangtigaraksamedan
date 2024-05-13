import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { parseISO } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { getLaporanList } from "@/actions/actionLaporan";
import { MonthYearRangeFilter } from "./MonthYearRangeFilter";
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function LaporanList({
  searchParams,
}: {
  searchParams: {
    month?: string;
    year?: string;
  };
}) {
  const selectedMonth =
    parseInt(searchParams?.month || "", 10) || new Date().getMonth() + 1; // Default bulan sekarang
  const selectedYear =
    parseInt(searchParams?.year || "", 10) || new Date().getFullYear();
  const { status, AR, SALES, OD, percentageOD } = await getLaporanList({
    month: selectedMonth,
    year: selectedYear,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set jam today to 00:00:00

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Set jam tomorrow to 00:00:00

  return (
    <>
      <div className="flex px-4 py-2">
        <MonthYearRangeFilter />
      </div>
      <div className="border rounded-md p-4">
        <h1 className="font-bold">
          Bulan{" "}
          {selectedMonth
            ? new Date(selectedYear, selectedMonth - 1).toLocaleString(
                "default",
                { month: "long" }
              )
            : "Semua"}
        </h1>
        <Table className="mx-auto mt-4 w-[1400px] rounded-md lg:w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2">DAYS</TableHead>
              <TableHead className="px-4 py-2">AR</TableHead>
              <TableHead className="px-4 py-2">OD</TableHead>
              <TableHead className="px-4 py-2">SALES</TableHead>
              <TableHead className="px-4 py-2">% OD</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Suspense fallback={<Skeleton className="h-10 w-10" />}>
              <TableRow>
                <TableCell className="px-4 py-2">Days</TableCell>
                <TableCell className="px-4 py-2">{AR}</TableCell>
                <TableCell className="px-4 py-2">{OD}</TableCell>
                <TableCell className="px-4 py-2">{SALES}</TableCell>
                <TableCell className="px-4 py-2">{percentageOD}</TableCell>
              </TableRow>
            </Suspense>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
