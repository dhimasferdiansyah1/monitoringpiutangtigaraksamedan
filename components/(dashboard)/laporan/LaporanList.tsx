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
import { getLaporanSemuaBulanList } from "@/actions/actionLaporanSemuaBulan";
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

  interface MonthlyData {
    status: any[];
    AR: number;
    SALES: number;
    OD: number;
    percentageOD: number;
  }

  const currentMonth = new Date().getMonth() + 1; // Bulan saat ini (1-12)

  // Ambil data untuk setiap bulan sampai bulan saat ini
  const monthlyData: MonthlyData[] = [];
  for (let month = 1; month <= currentMonth; month++) {
    const data = await getLaporanList({ month, year: selectedYear });
    monthlyData.push(data);
  }

  const {
    status: allMonthsStatus,
    AR: allMonthsAR,
    SALES: allMonthsSALES,
    OD: allMonthsOD,
    percentageOD: allMonthsPercentageOD,
  } = await getLaporanSemuaBulanList({
    year: selectedYear,
  });

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

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
      <div className="rounded-md border p-4">
        {/* Tabel untuk keseluruhan data */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md border table-auto">
            <thead className="bg-gray-100 text-primary">
              <tr>
                <th
                  className="w-1/14 py-3 px-4 uppercase font-semibold text-sm"
                  rowSpan={4}
                >
                  REGION
                </th>
                <th
                  className="w-1/14 py-3 px-4 uppercase font-semibold text-sm"
                  colSpan={12}
                >
                  {selectedYear}
                </th>
              </tr>
              <tr>
                {monthNames.map((month) => (
                  <th
                    className="w-1/14 py-3 px-4 uppercase font-semibold text-sm"
                    key={month}
                  >
                    {month}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr>
                <td className="w-1/14 py-3 px-4 border-b border-x">DAYS</td>
                {Array.from({ length: currentMonth }).map((_, index) => (
                  <td
                    className="w-1/14 py-3 px-4 border-b border-x"
                    key={index}
                  >
                    {/* Kosongkan Sementara */}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="w-1/14 py-3 px-4 border-b border-x">AR</td>
                {monthlyData.map((data, index) => (
                  <td
                    className="w-1/14 py-3 px-4 border-b border-x hover:bg-gray-100"
                    key={index}
                  >
                    {data.AR}
                    {/* Gunakan allMonthsStatus */}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="w-1/14 py-3 px-4 border-b border-x">OD</td>
                {monthlyData.map((data, index) => (
                  <td
                    className="w-1/14 py-3 px-4 border-b border-x hover:bg-gray-100"
                    key={index}
                  >
                    {data.OD}
                    {/* Gunakan allMonthsStatus */}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="w-1/14 py-3 px-4 border-b border-x">SALES</td>
                {monthlyData.map((data, index) => (
                  <td
                    className="w-1/14 py-3 px-4 border-b border-x hover:bg-gray-100"
                    key={index}
                  >
                    {data.SALES}
                    {/* Gunakan allMonthsStatus */}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="w-1/14 py-3 px-4 border-b border-x">% OD</td>
                {monthlyData.map((data, index) => (
                  <td
                    className="w-1/14 py-3 px-4 border-b border-x hover:bg-gray-100"
                    key={index}
                  >
                    {data.percentageOD}%{/* Gunakan allMonthsStatus */}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
