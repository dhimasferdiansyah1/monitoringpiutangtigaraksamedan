import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getStatusSerahDokumenList } from "@/actions/actionStatusSerahDokumen";
import {
  formatDateDistanceToNow,
  formatDateIsoFetch,
  formatRupiah,
} from "@/lib/utils";
import { differenceInDays, parseISO } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import {
  getJatuhTempo,
  getJatuhTempoPages,
} from "@/actions/actionJatuhTempoTukarFaktur";
import { Button } from "@/components/ui/button";
import ExportStatusSerahDokumen from "./ExportStatusSerahDokumen";
import { DateRangeFilter } from "../piutangselesai/DateRangeFilter";
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StatusSerahDokumenList({
  searchParams,
}: {
  searchParams: {
    startDate?: string;
    endDate?: string;
  };
}) {
  const startDateUTC = searchParams?.startDate
    ? new Date(searchParams.startDate)
    : undefined;
  const endDateUTC = searchParams?.endDate
    ? new Date(searchParams.endDate)
    : undefined;

  const startDate = startDateUTC
    ? zonedTimeToUtc(startDateUTC, "Asia/Jakarta")
    : undefined;
  const endDate = endDateUTC
    ? zonedTimeToUtc(endDateUTC, "Asia/Jakarta")
    : undefined;

  const statusList = await getStatusSerahDokumenList(startDate, endDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set jam today to 00:00:00

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Set jam tomorrow to 00:00:00

  // Calculate Jakarta date and time for each item in the data array:
  const jakartaTglJtArray = (statusList ?? []).map((main) => {
    const fakturTglJt = main.faktur?.tgl_jt ?? null;

    return utcToZonedTime(
      zonedTimeToUtc(parseISO(fakturTglJt?.toISOString() ?? ""), "UTC"),
      "Asia/Jakarta"
    );
  });
  jakartaTglJtArray.forEach((date) => {
    date.setHours(0, 0, 0, 0); // Set jam to 00:00:00 for Jakarta time
  });

  const now = new Date(); // Mendapatkan waktu saat ini
  const sixHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000); // Menghitung waktu 1 jam yang lalu

  return (
    <>
      <div className="flex px-4 py-2">
        <DateRangeFilter />
      </div>
      <Table className="mx-auto mt-4 w-[1400px] rounded-md lg:w-full">
        <TableCaption>List data serah dokumen</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2">No.</TableHead>
            <TableHead className="px-4 py-2">Customer</TableHead>
            <TableHead className="px-4 py-2">Kode Customer</TableHead>
            <TableHead className="px-4 py-2">No. PO</TableHead>
            <TableHead className="px-4 py-2">No. Faktur</TableHead>
            <TableHead className="px-4 py-2">
              {" "}
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 items-center" />
                <p>Status</p>
              </div>
            </TableHead>
            <TableHead className="px-4 py-2">Waktu</TableHead>
            <TableHead className="px-4 py-2">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {statusList ?? [].length > 0 ? (
            statusList?.map((item, index) => (
              <Suspense
                fallback={<Skeleton className="h-10 w-10" />}
                key={item.id}
              >
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-2 text-left font-medium">
                    {index + 1}
                  </TableCell>
                  <TableCell
                    aria-label="account customer"
                    className="px-4 py-2"
                  >
                    {item.customer.customer_name}
                  </TableCell>
                  <TableCell aria-label="nama customer" className="px-4 py-2">
                    {item.customer.account}
                  </TableCell>
                  <TableCell
                    aria-label="alamat customer"
                    className="px-4 py-2 sm:table-cell"
                  >
                    {item.no_po ?? "-"}
                  </TableCell>
                  <TableCell
                    aria-label="alamat customer"
                    className="px-4 py-2 sm:table-cell"
                  >
                    {item.faktur?.no_fk ?? "-"}
                  </TableCell>

                  <TableCell className="px-4 py-2">
                    {item.statusserahdokumen[0]?.status_serah ?? "-"}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    <div className=" flex flex-col md:flex-row gap-2 text-sm font-thin text-muted-foreground">
                      {formatDateDistanceToNow(
                        item.statusserahdokumen[0]?.createdAt.toISOString()
                      )}{" "}
                      yang lalu
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-2">
                    <Link href={`/dashboard/detail/${item.id}`}>
                      <Button variant="secondary">
                        Detail <ChevronRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              </Suspense>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="px-4 py-2">
                Tidak ada data status serah dokumen yang tersedia.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
