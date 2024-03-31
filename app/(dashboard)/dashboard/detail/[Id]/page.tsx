import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import {
  ArrowUpRightFromSquare,
  CheckSquare,
  Clock,
  NotebookPen,
  Pencil,
  Plus,
  Receipt,
  ShoppingCart,
  StoreIcon,
  Truck,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAllDetail } from "@/actions/actionDetail";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateDistanceToNow } from "@/lib/utils";
const CustomerCard = dynamic(
  () => import("@/components/(dashboard)/detail/CustomerCard"),
  {
    loading: () => (
      <Skeleton className="h-[224px] w-[329px] lg:h-full lg:w-full" />
    ),
  }
);
const PurchaseOrderCard = dynamic(
  () => import("@/components/(dashboard)/detail/PurchaseOrderCard"),
  { loading: () => <Skeleton className="h-[224px] w-[329px] lg:w-[385px]" /> }
);
const StatusSerahDokumenCard = dynamic(
  () => import("@/components/(dashboard)/detail/StatusSerahDokumenCard"),
  { loading: () => <Skeleton className="lg:h-full lg:w-full" /> }
);
const DeliveryNoteCard = dynamic(
  () => import("@/components/(dashboard)/detail/DeliveryNoteCard"),
  { loading: () => <Skeleton className="h-[224px] w-[329px] lg:w-[385px]" /> }
);
const FakturCard = dynamic(
  () => import("@/components/(dashboard)/detail/FakturCard"),
  { loading: () => <Skeleton className="h-[224px] w-[329px] lg:w-[385px]" /> }
);
const FakturPajakCard = dynamic(
  () => import("@/components/(dashboard)/detail/FakturPajakCard"),
  { loading: () => <Skeleton className="h-[205px] w-[329px] lg:w-[385px]" /> }
);
const TandaTerimaTagihanCard = dynamic(
  () => import("@/components/(dashboard)/detail/TandaTerimaTagihanCard"),
  { loading: () => <Skeleton className="h-[288px] w-[329px] lg:w-[385px]" /> }
);
import { notFound } from "next/navigation";
import { differenceInDays, parseISO } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

export async function generateMetadata({ params }: { params: { Id: string } }) {
  const id = params.Id;
  const detail = await getAllDetail(id);

  if (!detail) {
    return { notFound: true };
  }

  return {
    title: `${detail.customer.customer_name ?? "Tambah"} | Detail`,
  };
}

export default async function DetailPage({
  params,
}: {
  params: { Id: string };
}) {
  const id = params.Id;
  const detail = await getAllDetail(id);

  if (!detail) {
    return notFound();
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set jam today menjadi 00:00:00

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Set jam tomorrow menjadi 00:00:00

  // Convert `detail.faktur?.tgl_jt` to Jakarta time
  const jakartaTglJt = utcToZonedTime(
    zonedTimeToUtc(parseISO(detail.faktur?.tgl_jt?.toISOString() || ""), "UTC"),
    "Asia/Jakarta"
  );
  jakartaTglJt.setHours(0, 0, 0, 0); // Set jam to 00:00:00 for Jakarta time

  const jarakHari = differenceInDays(jakartaTglJt, today);
  const bgColor =
    detail.faktur?.tgl_jt === null
      ? "bg-gray-500"
      : jarakHari >= 2
      ? "bg-green-500"
      : jarakHari === 1
      ? "bg-yellow-500"
      : jarakHari === 0
      ? "bg-red-500"
      : "bg-red-700";

  const bgAnimColor =
    detail.faktur?.tgl_jt === null
      ? "bg-gray-400"
      : jarakHari >= 2
      ? "bg-green-400"
      : jarakHari === 1
      ? "bg-yellow-400"
      : jarakHari === 0
      ? "bg-red-400"
      : "bg-red-600";

  return (
    <div className="mx-auto my-12 max-w-7xl">
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          <div className="flex w-full flex-col">
            <div className="mb-2 text-center text-2xl font-bold">Detail</div>

            <div className="mx-4 mb-2 flex flex-col md:flex-row text-center items-center justify-center gap-2 text-sm font-thin text-muted-foreground">
              <Clock className="h-4 w-4" />
              dibuat {formatDateDistanceToNow(
                detail.createdAt.toISOString()
              )}{" "}
              yang lalu
            </div>
            <div className="relative mx-4 mb-8 flex items-center justify-center gap-2 text-sm font-thin text-muted-foreground">
              <span className="relative flex h-3 w-3">
                <span
                  className={`animate-ping absolute items-center justify-center inline-flex h-full w-full rounded-full ${bgAnimColor} opacity-75`}
                ></span>
                <span
                  className={`relative inline-flex items-center justify-center rounded-full h-3 w-3 ${bgColor}`}
                ></span>
              </span>
              {detail.faktur?.tgl_jt === undefined ||
              detail.faktur?.tgl_jt === null ? (
                "Belum ada tanggal jatuh tempo"
              ) : (
                <div>
                  {jarakHari === 0
                    ? // Hari ini
                      "Sudah jatuh tempo"
                    : jarakHari === 1
                    ? // Besok
                      "Besok jatuh tempo"
                    : jarakHari > 0
                    ? // Jatuh tempo X hari lagi
                      `${jarakHari} hari lagi jatuh tempo`
                    : // Jatuh tempo telah lewat X hari
                      `Jatuh tempo telah lewat ${Math.abs(jarakHari)} hari`}
                </div>
              )}
            </div>
            <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="cursor-default">
                    {detail?.no_po && detail.tgl_po && detail.foto_po ? (
                      <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                        Purchase Order ✅
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                        Purchase Order ❌
                      </div>
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    {detail?.no_po && detail.tgl_po && detail.foto_po ? (
                      <div className="text-sm flex items-center gap-2">
                        Lengkap ✅
                      </div>
                    ) : (
                      <div className="text-sm flex items-center gap-2">
                        Belum Lengkap ❌
                      </div>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="cursor-default">
                    {detail?.delivery_note?.no_dn &&
                    detail.delivery_note.foto1_dn &&
                    detail.delivery_note.foto2_dn ? (
                      <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                        Delivery Note ✅
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                        Delivery Note ❌
                      </div>
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    {detail?.delivery_note?.no_dn &&
                    detail.delivery_note.foto1_dn &&
                    detail.delivery_note.foto2_dn ? (
                      <div className="text-sm flex items-center gap-2">
                        Lengkap ✅
                      </div>
                    ) : (
                      <div className="text-sm flex items-center gap-2">
                        Belum Lengkap ❌
                      </div>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="cursor-default">
                    {detail?.faktur?.no_fk &&
                    detail.faktur.tgl_fk &&
                    detail.faktur.tgl_jt &&
                    detail.faktur.nilai &&
                    detail.faktur.foto1_fk &&
                    detail.faktur.foto2_fk ? (
                      <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                        Faktur ✅
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                        Faktur ❌
                      </div>
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    {detail?.faktur?.no_fk &&
                    detail.faktur.tgl_fk &&
                    detail.faktur.tgl_jt &&
                    detail.faktur.nilai &&
                    detail.faktur.foto1_fk &&
                    detail.faktur.foto2_fk ? (
                      <div className="text-sm flex items-center gap-2">
                        Lengkap ✅
                      </div>
                    ) : (
                      <div className="text-sm flex items-center gap-2">
                        Belum Lengkap ❌
                      </div>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="cursor-default">
                    {detail?.faktur_pajak?.no_fkp &&
                    detail.faktur_pajak.tgl_fkp &&
                    detail.faktur_pajak.foto_fkp ? (
                      <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                        Faktur Pajak ✅
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                        Faktur Pajak ❌
                      </div>
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    {detail?.faktur_pajak?.no_fkp &&
                    detail.faktur_pajak.tgl_fkp &&
                    detail.faktur_pajak.foto_fkp ? (
                      <div className="text-sm flex items-center gap-2">
                        Lengkap ✅
                      </div>
                    ) : (
                      <div className="text-sm flex items-center gap-2">
                        Belum Lengkap ❌
                      </div>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="cursor-default">
                    {detail?.tandaterimatagihan?.no_penagihan &&
                    detail.tandaterimatagihan.status &&
                    detail.tandaterimatagihan.tgl_jt &&
                    detail.tandaterimatagihan.foto_ttt ? (
                      <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                        Tanda Terima Tagihan ✅
                      </div>
                    ) : (
                      <div className="px-3 py-1 bg-muted border rounded-md text-sm flex items-center gap-2">
                        Tanda Terima Tagihan ❌
                      </div>
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    {detail?.tandaterimatagihan?.no_penagihan &&
                    detail.tandaterimatagihan.status &&
                    detail.tandaterimatagihan.tgl_jt &&
                    detail.tandaterimatagihan.foto_ttt ? (
                      <div className="text-sm flex items-center gap-2">
                        Lengkap ✅
                      </div>
                    ) : (
                      <div className="text-sm flex items-center gap-2">
                        Belum Lengkap ❌
                      </div>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Link
              href={`/dashboard/customer/purchaseorder/${detail.customer.id}`}
              className="flex items-center justify-end gap-2 mb-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 cursor-pointer"
            >
              Lihat Semua Purchase Order Yang Dimiliki Oleh Customer Ini
              <ArrowUpRightFromSquare className="h-5 w-5 text-blue-600" />
            </Link>
            <Card className="flex w-full flex-col justify-between gap-4 border-white shadow-none dark:border-zinc-950 lg:flex-row  lg:border-zinc-200 lg:p-4 lg:shadow-sm dark:lg:border-zinc-800">
              <div className="flex w-full flex-col gap-2 lg:basis-4/6">
                <div className="flex gap-2 px-2 font-bold">
                  <StoreIcon className="h-5 w-5" />
                  <p>Customer</p>
                </div>
                <CustomerCard params={detail} />
                <div className="mt-4 flex gap-2 px-2 font-bold">
                  <CheckSquare className="h-5 w-5" />
                  Status Serah Dokumen
                </div>
                <div className="overflow-x-auto">
                  <StatusSerahDokumenCard params={detail} />
                </div>
              </div>
              <div className="flex w-full flex-col gap-4 lg:basis-2/6">
                <div className="flex flex-col items-start gap-2 lg:basis-1/6">
                  <div className="flex items-center gap-2 px-2 font-bold">
                    <ShoppingCart className="h-5 w-5" />
                    PurchaseOrder
                    <div
                      className={`mx-4 flex w-fit items-center rounded-full p-[2px] px-[10px] text-sm lg:w-auto ${
                        detail?.status_po === "Berjalan"
                          ? "bg-yellow-300/80 text-yellow-950 hover:bg-yellow-200 dark:bg-yellow-300/30 dark:text-yellow-100"
                          : "bg-green-300 text-white hover:bg-green-200"
                      }`}
                    >
                      {detail?.status_po}
                    </div>
                  </div>
                  <PurchaseOrderCard params={detail} />
                  <Link
                    href={`/dashboard/detail/${detail.id}/purchaseorder/${detail.id}`}
                  >
                    <Button variant="secondary" className="flex gap-2">
                      Edit
                      <Pencil className="hover:text-primary-400 h-4 w-4 cursor-pointer text-primary" />
                    </Button>
                  </Link>
                </div>
                <hr className="my-1.5" />

                <div className="flex flex-col items-start gap-2 lg:basis-1/6">
                  <div className="flex items-center gap-2 px-2 font-bold">
                    <Truck className="h-5 w-5" />
                    Delivery Note
                  </div>
                  <DeliveryNoteCard params={detail} />
                  <Link
                    href={`/dashboard/detail/${detail?.id}/deliverynote/${detail?.delivery_note?.id}`}
                  >
                    <Button variant="secondary">
                      {detail.delivery_note?.no_dn?.length ?? 0 > 0 ? (
                        <p className="flex gap-2">
                          Edit{" "}
                          <Pencil className="hover:text-primary-400 h-4 w-4 cursor-pointer text-primary" />
                        </p>
                      ) : (
                        <p className="flex gap-2">
                          <Plus className="hover:text-primary-400 h-4 w-4 cursor-pointer text-primary" />
                          Tambah
                        </p>
                      )}
                    </Button>
                  </Link>
                </div>
                <hr className="my-1.5" />

                <div className="flex flex-col items-start gap-2 lg:basis-1/6">
                  <div className="flex items-center gap-2 px-2 font-bold">
                    <Receipt className="h-5 w-5" />
                    Faktur
                  </div>
                  <FakturCard params={detail} />
                  <Link
                    href={`/dashboard/detail/${detail.id}/faktur/${detail.faktur?.id}`}
                  >
                    <Button variant="secondary">
                      {detail?.faktur?.no_fk?.length ?? 0 > 0 ? (
                        <p className="flex gap-2">
                          Edit{" "}
                          <Pencil className="hover:text-primary-400 h-4 w-4 cursor-pointer text-primary" />
                        </p>
                      ) : (
                        <p className="flex gap-2">
                          <Plus className="hover:text-primary-400 h-4 w-4 cursor-pointer text-primary" />
                          Tambah
                        </p>
                      )}
                    </Button>
                  </Link>
                </div>
                <hr className="my-1.5" />

                <div className="flex flex-col items-start gap-2 lg:basis-1/6">
                  <div className="flex items-center gap-2 px-2 font-bold">
                    <Receipt className="h-5 w-5" />
                    Faktur Pajak
                  </div>
                  <FakturPajakCard params={detail} />
                  <Link
                    href={`/dashboard/detail/${detail.id}/fakturpajak/${detail.faktur_pajak?.id}`}
                  >
                    <Button variant="secondary">
                      {detail?.faktur_pajak?.no_fkp?.length ?? 0 > 0 ? (
                        <p className="flex gap-2">
                          Edit{" "}
                          <Pencil className="hover:text-primary-400 h-4 w-4 cursor-pointer text-primary" />
                        </p>
                      ) : (
                        <p className="flex gap-2">
                          <Plus className="hover:text-primary-400 h-4 w-4 cursor-pointer text-primary" />
                          Tambah
                        </p>
                      )}
                    </Button>
                  </Link>
                </div>
                <hr className="my-1.5" />

                <div className="flex flex-col items-start gap-2 lg:basis-1/6">
                  <div className="flex items-center gap-2 px-2 font-bold">
                    <NotebookPen className="h-5 w-5" />
                    Tanda Terima Tagihan
                  </div>
                  <TandaTerimaTagihanCard params={detail} />
                  <Link
                    href={`/dashboard/detail/${detail.id}/tandaterimatagihan/${detail.tandaterimatagihan?.id}`}
                  >
                    <Button variant="secondary">
                      {detail?.tandaterimatagihan?.no_penagihan?.length ??
                      0 > 0 ? (
                        <p className="flex gap-2">
                          Edit{" "}
                          <Pencil className="hover:text-primary-400 h-4 w-4 cursor-pointer text-primary" />
                        </p>
                      ) : (
                        <p className="flex gap-2">
                          <Plus className="hover:text-primary-400 h-4 w-4 cursor-pointer text-primary" />
                          Tambah
                        </p>
                      )}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
