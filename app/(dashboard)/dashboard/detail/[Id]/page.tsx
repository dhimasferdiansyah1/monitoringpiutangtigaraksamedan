import { Card } from "@/components/ui/card";
import {
  CheckSquare,
  Clock,
  NotebookPen,
  Pencil,
  Receipt,
  ShoppingCart,
  StoreIcon,
  Truck,
} from "lucide-react";
import { getAllDetail } from "@/actions/actionDetail";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateDistanceToNow } from "@/lib/utils";
import { Suspense } from "react";
import CustomerCard from "@/components/(dashboard)/detail/CustomerCard";
import StatusSerahDokumenCard from "@/components/(dashboard)/detail/StatusSerahDokumenCard";
import PurchaseOrderCard from "@/components/(dashboard)/detail/PurchaseOrderCard";
import DeliveryNoteCard from "@/components/(dashboard)/detail/DeliveryNoteCard";
import FakturCard from "@/components/(dashboard)/detail/FakturCard";
import FakturPajakCard from "@/components/(dashboard)/detail/FakturPajakCard";
import TandaTerimaTagihanCard from "@/components/(dashboard)/detail/TandaTerimaTagihanCard";
import { notFound } from "next/navigation";
// export const dynamic = "force-dynamic";
// export const revalidate = 0;

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

  return (
    <div className="mx-auto my-12 max-w-7xl">
      <div className="container mx-auto">
        <div className="flex items-center justify-center">
          <div className="flex w-full flex-col">
            <div className="mb-2 text-center text-2xl font-bold">Detail</div>
            <div className="mx-4 mb-8 flex items-center justify-center gap-2 text-sm font-thin text-muted-foreground">
              <Clock className="h-4 w-4" />
              dibuat {formatDateDistanceToNow(
                detail.createdAt.toISOString()
              )}{" "}
              yang lalu
            </div>
            <Card className="flex w-full flex-col justify-between gap-4 border-white shadow-none dark:border-zinc-950 lg:flex-row  lg:border-zinc-200 lg:p-4 lg:shadow-sm dark:lg:border-zinc-800">
              <div className="flex w-full flex-col gap-2 lg:basis-4/6">
                <div className="flex gap-2 px-2 font-bold">
                  <StoreIcon className="h-5 w-5" />
                  <p>Customer</p>
                </div>
                <Suspense
                  fallback={
                    <Skeleton className="h-[224px] w-[329px] lg:h-full lg:w-full" />
                  }
                >
                  <CustomerCard params={detail} />
                </Suspense>
                <div className="mt-4 flex gap-2 px-2 font-bold">
                  <CheckSquare className="h-5 w-5" />
                  Status Serah Dokumen
                </div>
                <Suspense
                  fallback={<Skeleton className="lg:h-full lg:w-full" />}
                >
                  <StatusSerahDokumenCard />
                </Suspense>
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
                  <Suspense
                    fallback={
                      <Skeleton className="h-[224px] w-[329px] lg:w-[385px]" />
                    }
                  >
                    <PurchaseOrderCard params={detail} />
                    <Link
                      href={`/dashboard/detail/${detail.id}/purchaseorder/${detail.id}`}
                    >
                      <Button variant="secondary" className="flex gap-2">
                        Edit
                        <Pencil className="hover:text-primary-400 h-4 w-4 cursor-pointer text-primary" />
                      </Button>
                    </Link>
                  </Suspense>
                </div>
                <hr className="my-1.5" />

                <div className="flex flex-col items-start gap-2 lg:basis-1/6">
                  <div className="flex items-center gap-2 px-2 font-bold">
                    <Truck className="h-5 w-5" />
                    Delivery Note
                  </div>
                  {/* <Suspense
                    fallback={
                      <Skeleton className="h-[224px] w-[329px] lg:w-[385px]" />
                    }
                  >
                    <DeliveryNoteCard
                      deliveryNoteId={detail.delivery_note?.id ?? ""}
                    />
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
                  </Suspense> */}
                </div>
                <hr className="my-1.5" />

                <div className="flex flex-col items-start gap-2 lg:basis-1/6">
                  <div className="flex items-center gap-2 px-2 font-bold">
                    <Receipt className="h-5 w-5" />
                    Faktur
                  </div>
                  {/* <Suspense
                    fallback={
                      <Skeleton className="h-[224px] w-[329px] lg:w-[385px]" />
                    }
                  >
                    <FakturCard fakturId={detail.faktur?.id ?? ""} />
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
                  </Suspense> */}
                </div>
                <hr className="my-1.5" />

                <div className="flex flex-col items-start gap-2 lg:basis-1/6">
                  <div className="flex items-center gap-2 px-2 font-bold">
                    <Receipt className="h-5 w-5" />
                    Faktur Pajak
                  </div>
                  {/* <Suspense
                    fallback={
                      <Skeleton className="h-[205px] w-[329px] lg:w-[385px]" />
                    }
                  >
                    <FakturPajakCard
                      fakturPajakId={detail.faktur_pajak?.id ?? ""}
                    />
                  </Suspense> */}
                </div>
                <hr className="my-1.5" />

                <div className="flex flex-col items-start gap-2 lg:basis-1/6">
                  <div className="flex items-center gap-2 px-2 font-bold">
                    <NotebookPen className="h-5 w-5" />
                    Tanda Terima Tagihan
                  </div>
                  {/* <Suspense
                    fallback={
                      <Skeleton className="h-[288px] w-[329px] lg:w-[385px]" />
                    }
                  >
                    <TandaTerimaTagihanCard
                      tandaTerimaTagihanId={detail.tandaterimatagihan?.id ?? ""}
                    />
                  </Suspense> */}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
