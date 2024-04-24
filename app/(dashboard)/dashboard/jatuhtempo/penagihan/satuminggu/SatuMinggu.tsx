import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRightFromSquare,
  ChevronRight,
  Info,
  PlusCircle,
  SquarePen,
  Store,
  Trash2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDateIsoFetch, formatDateAndTimeIsoFetch } from "@/lib/utils";
import DeleteMainMonitoringList from "@/components/(dashboard)/DeleteMonitoringList";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import Pagination from "@/components/(dashboard)/Pagination";
import { differenceInDays, parseISO } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import {
  getJatuhTempoSatuMinggu,
  getJatuhTempoSatuMingguPages,
} from "@/actions/actionJatuhTempoPenagihan";
import { Suspense } from "react";
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SatuMinggu({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    search?: string;
  };
}) {
  const query = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;
  const JatuhTempoSatuMinggu = await getJatuhTempoSatuMinggu(
    currentPage,
    query
  );
  const totalPages = await getJatuhTempoSatuMingguPages(query);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set jam today to 00:00:00

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Set jam tomorrow to 00:00:00

  // Calculate Jakarta date and time for each item in the data array:
  const jakartaTglJtArray = JatuhTempoSatuMinggu.map((main) => {
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
  const oneHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000); // Menghitung waktu 1 jam yang lalu

  return (
    <div className="flex flex-col">
      <p className="text-sm text-muted-foreground">
        Total : {JatuhTempoSatuMinggu.length}
      </p>
      <div className="flex justify-end gap-4"></div>
      <div className="my-4 grid grid-cols-1 items-center justify-center gap-2 md:grid-cols-2 xl:grid-cols-3">
        {JatuhTempoSatuMinggu.length > 0 ? (
          JatuhTempoSatuMinggu.map((po, index) => (
            <Suspense fallback={<div>Loading...</div>} key={po.id}>
              <Card className="flex flex-col p-4 duration-200 hover:shadow hover:border-zinc-300 dark:hover:border-zinc-600 hover:duration-200 dark:bg-zinc-900 dark:hover:shadow-zinc-800">
                <div className="flex-col">
                  <div className="flex flex-col gap-1">
                    <div className="lg: mb-3 flex flex-col justify-between gap-2 lg:w-[370px] lg:flex-row lg:gap-0">
                      <div className="flex gap-4">
                        <div className="flex gap-2">
                          <Store className="h-5 w-5" />
                          <h1 className="relative max-w-40 items-center gap-2 font-bold">
                            <span className="hover:max-height-full top-0 z-10 line-clamp-[*] block max-w-80 overflow-hidden truncate transition-all duration-300 ease-in-out hover:absolute hover:w-80 hover:overflow-visible hover:text-balance hover:rounded-md hover:bg-muted-foreground hover:px-2 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-950">
                              {po.customer.customer_name}
                            </span>
                          </h1>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Link
                                  href={`/dashboard/customer/purchaseorder/${po.customer.id}`}
                                >
                                  <ArrowUpRightFromSquare className="h-5 w-5 text-blue-600" />
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Lihat semua purchase order yang dimiliki oleh
                                  customer ini
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <div className="hidden sm:flex items-center justify-center">
                            {new Date(po.createdAt.toISOString()) >=
                              oneHoursAgo && (
                              <p className="text-zinc-400 rounded-full text-xs">
                                Baru
                              </p>
                            )}
                          </div>
                        </div>

                        <Popover>
                          <PopoverTrigger className="w-fit" aria-label="info">
                            <Info className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-primary" />
                          </PopoverTrigger>
                          <PopoverContent className="z-10 mx-2 w-[320px] lg:mx-0 lg:w-[500px]">
                            <div className="flex w-[250px]  flex-col   lg:w-[500px]">
                              <div className="flex gap-2">
                                <p className="w-24">Alamat</p>
                                <span>:</span>
                                <p>{po.customer?.alamat}</p>
                              </div>

                              <div className="flex gap-2">
                                <p className="w-24">Nomor Telp</p>
                                <span>:</span>
                                <div>
                                  {po.customer?.no_telp || (
                                    <p className="text-destructive dark:text-red-400">
                                      Tidak memiliki
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <p className="w-24">Email</p>
                                <span>:</span>
                                <div>
                                  {po.customer?.email || (
                                    <p className="text-destructive dark:text-red-400">
                                      Tidak memiliki
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>

                      <span
                        className={`flex w-fit items-center justify-center rounded-full p-[2px] px-[10px] text-sm lg:w-auto hover:bg-opacity-80 dark:hover:brightness-105 ${
                          po.status_po === "Baru"
                            ? "bg-blue-100 text-blue-900 dark:bg-blue-300 dark:text-blue-50"
                            : po.status_po === "Pengantaran"
                            ? "bg-blue-300 text-blue-900 dark:bg-blue-500 dark:text-blue-100"
                            : po.status_po === "Tukar faktur"
                            ? "bg-yellow-300 text-yellow-900 dark:bg-yellow-500 dark:text-yellow-100"
                            : po.status_po === "Penagihan"
                            ? "bg-red-300 text-red-900 dark:bg-red-500 dark:text-red-100"
                            : po.status_po === "Pelunasan"
                            ? "bg-violet-300 text-violet-900 dark:bg-violet-500 dark:text-violet-100"
                            : po.status_po === "Selesai"
                            ? "bg-green-300 text-white dark:bg-green-500"
                            : ""
                        }`}
                      >
                        {po.status_po}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-muted-foreground">
                        ( {po.customer.account} )
                      </p>
                      <div className="flex gap-2">
                        <p className="w-24">Nomor PO</p>
                        <span>:</span>
                        <p>{po.no_po}</p>
                      </div>
                      <div className="flex gap-2">
                        <p className="w-24">Nomor DN</p>
                        <span>:</span>
                        <div>
                          {po.delivery_note?.no_dn || (
                            <p className="text-destructive dark:text-red-400">
                              Tidak ada
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <p className="w-24">Nomor FK</p>
                        <span>:</span>
                        <div>
                          {po.faktur?.no_fk || (
                            <p className="text-destructive dark:text-red-400">
                              Tidak ada
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <p className="w-24">Tanggal FK</p>
                        <span>:</span>
                        <div>
                          {formatDateIsoFetch(
                            po.faktur?.tgl_fk?.toISOString()
                          ) || (
                            <p className="text-destructive dark:text-red-400">
                              Tidak ada
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <p className="w-24">Tanggal JT Penagihan</p>
                        <span>:</span>
                        <div>
                          {formatDateIsoFetch(
                            po.tandaterimatagihan?.tgl_jt?.toISOString() ?? ""
                          ) || (
                            <p className="text-destructive dark:text-red-400">
                              Tidak ada
                            </p>
                          )}
                        </div>
                      </div>
                      {po.statusserahdokumen.map((status) => (
                        <div
                          key={status.id}
                          className="mt-3 flex text-muted-foreground"
                        >
                          <div className="flex flex-col space-x-0 text-sm">
                            <p>{status.status_serah}</p>
                            <p>
                              {formatDateAndTimeIsoFetch(
                                status.updatedAt.toISOString()
                              )}
                            </p>
                            <p>{status.user}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center gap-4">
                    <div className="relative flex items-center justify-center gap-2 text-sm font-thin text-muted-foreground">
                      <span className="relative flex h-3 w-3">
                        <span
                          className={`animate-ping absolute items-center justify-center inline-flex h-full w-full rounded-full ${
                            po.faktur?.tgl_jt === null
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
                            po.faktur?.tgl_jt === null
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
                      {po.faktur?.tgl_jt === undefined ||
                      po.faktur?.tgl_jt === null ? (
                        "Belum ada tanggal jatuh tempo penagihan"
                      ) : (
                        <div>
                          {differenceInDays(jakartaTglJtArray[index], today) ===
                          0
                            ? // Hari ini
                              "Sudah jatuh tempo penagihan"
                            : differenceInDays(
                                jakartaTglJtArray[index],
                                today
                              ) === 1
                            ? // Besok
                              "Besok jatuh tempo penagihan"
                            : differenceInDays(
                                jakartaTglJtArray[index],
                                today
                              ) > 0
                            ? // Jatuh tempo X hari lagi
                              `${differenceInDays(
                                jakartaTglJtArray[index],
                                today
                              )} hari lagi jatuh tempo penagihan`
                            : // Jatuh tempo telah lewat X hari
                              `Jatuh tempo penagihan telah lewat ${Math.abs(
                                differenceInDays(
                                  jakartaTglJtArray[index],
                                  today
                                )
                              )} hari`}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-end gap-4">
                      <AlertDialog>
                        <AlertDialogTrigger name="delete" aria-label="delete">
                          <Trash2 className="h-8 w-8 cursor-pointer text-destructive transition-colors duration-300 ease-in-out hover:text-red-400 dark:text-red-400 dark:hover:text-red-300" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Jika kamu setuju untuk menghapus, maka tindakan
                              ini tidak bisa dibatalkan.
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Ini akan menghapus purchase order{" "}
                              <span className="text-destructive">
                                {po.no_po}
                              </span>{" "}
                              yang dimiliki customer{" "}
                              <span className="text-muted-foreground">
                                {po.customer.customer_name} (
                                {po.customer.account})
                              </span>
                              ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <DeleteMainMonitoringList id={po.id} />
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Link href={`/dashboard/detail/${po.id}`}>
                        <Button variant="secondary">
                          Detail <ChevronRight className="h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            </Suspense>
          ))
        ) : (
          <p className="text-center mx-auto text-muted-foreground">
            Tidak ada data monitoring yang tersedia
          </p>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
