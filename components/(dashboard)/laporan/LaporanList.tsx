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
import { getLaporanList, calculateAverages } from "@/actions/actionLaporan";
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
  const { AR, SALES, OD, percentageOD, DAYS } = await getLaporanList({
    month: selectedMonth,
    year: selectedYear,
  });

  const { avgDAYS, avgAR, avgOD, avgSALES, avgPercentageOD } =
    await calculateAverages(selectedYear);

  interface MonthlyData {
    status: any[];
    AR: number;
    SALES: number;
    OD: number;
    percentageOD: number;
    DAYS: number;
  }

  const currentMonth = new Date().getMonth() + 1; // Bulan saat ini (1-12)

  // Ambil data untuk setiap bulan sampai bulan saat ini
  const monthlyData: MonthlyData[] = [];
  for (let month = 1; month <= currentMonth; month++) {
    const data = await getLaporanList({ month, year: selectedYear });
    monthlyData.push(data);
  }

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
                <TableCell className="px-4 py-2">{DAYS}</TableCell>
                <TableCell className="px-4 py-2">{AR}</TableCell>
                <TableCell className="px-4 py-2">{OD}</TableCell>
                <TableCell className="px-4 py-2">{SALES}</TableCell>
                <TableCell className="px-4 py-2">{percentageOD}</TableCell>
              </TableRow>
            </Suspense>
          </TableBody>
        </Table>
      </div>
      <div>
        {/* Tabel untuk keseluruhan data */}
        <div className="overflow-x-auto mt-8">
          <div className="min-w-full bg-white rounded-md border shadow-md">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th
                    className="w-full py-3 px-4 uppercase font-semibold text-sm text-center"
                    colSpan={13}
                  >
                    {selectedYear}
                  </th>
                </tr>
                <tr>
                  {" "}
                  <th className="w-1/14 py-3 px-4 uppercase font-semibold text-sm text-left">
                    REGION MEDAN
                  </th>
                  {monthNames.map((month) => (
                    <th
                      className="w-1/14 py-3 px-4 uppercase font-semibold text-sm text-center"
                      key={month}
                    >
                      {month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="py-3 px-4 border-b border-gray-200">DAYS</td>
                  {monthlyData.map((data, index) => (
                    <td
                      className={`py-3 px-4 border-b border-gray-200 text-center ${
                        data.DAYS >= 40
                          ? "bg-red-300 hover:bg-red-400"
                          : "bg-green-300 hover:bg-green-400"
                      }`}
                      key={index}
                    >
                      {data.DAYS}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-gray-200">AR</td>
                  {monthlyData.map((data, index) => (
                    <td
                      className="py-3 px-4 border-b border-gray-200 text-center"
                      key={index}
                    >
                      {data.AR}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-gray-200">OD</td>
                  {monthlyData.map((data, index) => (
                    <td
                      className="py-3 px-4 border-b border-gray-200 text-center"
                      key={index}
                    >
                      {data.OD}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-gray-200">SALES</td>
                  {monthlyData.map((data, index) => (
                    <td
                      className="py-3 px-4 border-b border-gray-200 text-center"
                      key={index}
                    >
                      {data.SALES}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-gray-200">% OD</td>
                  {monthlyData.map((data, index) => (
                    <td
                      className={`py-3 px-4 border-b border-gray-200 text-center ${
                        data.percentageOD >= 4
                          ? "bg-red-300 hover:bg-red-400"
                          : "bg-green-300 hover:bg-green-400"
                      }`}
                      key={index}
                    >
                      {data.percentageOD}%
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Tabel rata-rata */}
      <div className="border rounded-md p-4 mt-4">
        <h2 className="font-bold">Rata-rata Tahun {selectedYear}</h2>
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
            <TableRow>
              <TableCell className="px-4 py-2">{avgDAYS.toFixed(2)}</TableCell>
              <TableCell className="px-4 py-2">{avgAR.toFixed(2)}</TableCell>
              <TableCell className="px-4 py-2">{avgOD.toFixed(2)}</TableCell>
              <TableCell className="px-4 py-2">{avgSALES.toFixed(2)}</TableCell>
              <TableCell className="px-4 py-2">
                {avgPercentageOD.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

