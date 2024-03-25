import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getFakturPajakDetail } from "@/actions/actionFakturPajak";
import TambahFakturPajak from "@/components/(dashboard)/detail/fakturpajak/TambahFakturPajak";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { fakturPajakId: string };
}) {
  const id = params.fakturPajakId;
  const fakturPajak = await getFakturPajakDetail(id);

  if (!fakturPajak) {
    return { notFound: true };
  }

  return {
    title: `${fakturPajak.no_fkp ?? "Tambah"} | Faktur Pajak`, // Set the title from fetched data
  };
};

export default async function FakturPajakDetail({
  params,
}: {
  params: { fakturPajakId: string };
}) {
  const fakturPajakId = params.fakturPajakId;
  const fakturPajak = await getFakturPajakDetail(fakturPajakId);

  if (!fakturPajak) {
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
            <TambahFakturPajak fakturPajakId={fakturPajak} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
