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
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StatusSerahDokumenList() {
  const statusList = await getStatusSerahDokumenList();

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
    <Table className="mx-auto mt-4 w-[512px] rounded-md lg:w-full">
      <TableCaption>List data serah dokumen</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="px-4 py-2">No.</TableHead>
          <TableHead className="px-4 py-2">Customer</TableHead>
          <TableHead className="px-4 py-2">Kode Customer</TableHead>
          <TableHead className="px-4 py-2">No. Faktur</TableHead>
          <TableHead className="px-4 py-2">Tgl Faktur</TableHead>
          <TableHead className="px-4 py-2">Tgl Jatuh tempo</TableHead>
          <TableHead className="px-4 py-2">Jatuh tempo</TableHead>
          <TableHead className="px-4 py-2">Nilai</TableHead>
          <TableHead className="px-4 py-2">
            {" "}
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 items-center" />
              <p>Status</p>
            </div>
          </TableHead>
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
                <TableCell aria-label="account customer" className="px-4 py-2">
                  {item.customer.customer_name}
                </TableCell>
                <TableCell aria-label="nama customer" className="px-4 py-2">
                  {item.customer.account}
                </TableCell>
                <TableCell
                  aria-label="alamat customer"
                  className="px-4 py-2 sm:table-cell"
                >
                  {item.faktur?.no_fk ?? "-"}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {item.faktur?.tgl_fk
                    ? formatDateIsoFetch(item.faktur?.tgl_fk?.toISOString())
                    : "-"}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {item.faktur?.tgl_fk
                    ? formatDateIsoFetch(item.faktur?.tgl_jt?.toISOString())
                    : "-"}
                </TableCell>
                <TableCell className="px-4 py-2">
                  <div className="relative flex items-center justify-center gap-2 text-sm font-thin text-muted-foreground">
                    <span className="relative flex h-3 w-3">
                      <span
                        className={`animate-ping absolute items-center justify-center inline-flex h-full w-full rounded-full ${
                          item.faktur?.tgl_jt === null
                            ? "bg-gray-400"
                            : differenceInDays(
                                jakartaTglJtArray[index],
                                today
                              ) >= 2
                            ? "bg-green-400"
                            : differenceInDays(
                                jakartaTglJtArray[index],
                                today
                              ) === 1
                            ? "bg-yellow-400"
                            : differenceInDays(
                                jakartaTglJtArray[index],
                                today
                              ) === 0
                            ? "bg-red-400"
                            : "bg-red-600"
                        } opacity-75`}
                      />
                      <span
                        className={`relative inline-flex items-center justify-center rounded-full h-3 w-3 ${
                          item.faktur?.tgl_jt === null
                            ? "bg-gray-500"
                            : differenceInDays(
                                jakartaTglJtArray[index],
                                today
                              ) >= 2
                            ? "bg-green-500"
                            : differenceInDays(
                                jakartaTglJtArray[index],
                                today
                              ) === 1
                            ? "bg-yellow-500"
                            : differenceInDays(
                                jakartaTglJtArray[index],
                                today
                              ) === 0
                            ? "bg-red-500"
                            : "bg-red-700"
                        }`}
                      />
                    </span>
                    {item.faktur?.tgl_jt === undefined ||
                    item.faktur?.tgl_jt === null ? (
                      "Belum ada tanggal jatuh tempo"
                    ) : (
                      <div>
                        {differenceInDays(jakartaTglJtArray[index], today) === 0
                          ? // Hari ini
                            "Sudah jatuh tempo"
                          : differenceInDays(
                              jakartaTglJtArray[index],
                              today
                            ) === 1
                          ? // Besok
                            "Besok jatuh tempo"
                          : differenceInDays(jakartaTglJtArray[index], today) >
                            0
                          ? // Jatuh tempo X hari lagi
                            `${differenceInDays(
                              jakartaTglJtArray[index],
                              today
                            )} hari lagi jatuh tempo`
                          : // Jatuh tempo telah lewat X hari
                            `Jatuh tempo telah lewat ${Math.abs(
                              differenceInDays(jakartaTglJtArray[index], today)
                            )} hari`}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-2">
                  {item.faktur?.nilai ? item.faktur?.nilai ?? "" : "-"}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {item.statusserahdokumen[0]?.status_serah ?? "-"}
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
  );
}
