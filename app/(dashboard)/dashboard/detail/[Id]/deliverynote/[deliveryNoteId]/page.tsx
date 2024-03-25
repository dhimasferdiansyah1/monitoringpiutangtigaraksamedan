import TambahDeliveryNote from "@/components/(dashboard)/detail/deliverynote/TambahDeliveryNote";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { getDeliveryNoteDetail } from "@/actions/actionDeliveryNote";
import { notFound } from "next/navigation";
import { getAllDetail } from "@/actions/actionDetail";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { deliveryNoteId: string };
}) {
  const id = params.deliveryNoteId;
  const deliveryNote = await getDeliveryNoteDetail(id);

  if (!deliveryNote) {
    return { notFound: true };
  }

  return {
    title: `${deliveryNote.no_dn ?? "Tambah"} | Delivery Note`, // Set the title from fetched data
  };
};

export default async function DeliveryNoteDetail({
  params,
}: {
  params: { deliveryNoteId: string };
}) {
  const id = params.deliveryNoteId;

  const deliveryNote = await getDeliveryNoteDetail(id);

  if (!deliveryNote) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Suspense
            fallback={
              <Skeleton className="my-8 h-[400px] w-[200px] lg:h-[600px] lg:w-[500px]" />
            }
          >
            <TambahDeliveryNote deliveryNoteId={deliveryNote} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
