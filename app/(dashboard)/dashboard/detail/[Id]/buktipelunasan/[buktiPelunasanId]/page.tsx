import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getBuktiPelunasanDetail } from "@/actions/actionBuktiPelunasan";
import TambahFakturPajak from "@/components/(dashboard)/detail/fakturpajak/TambahFakturPajak";
import { notFound } from "next/navigation";
import TambahBuktiPelunasan from "@/components/(dashboard)/detail/buktipelunasan/TambahBuktiPelunasan";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { buktiPelunasanId: string };
}) {
  const id = params.buktiPelunasanId;
  const buktiPelunasan = await getBuktiPelunasanDetail(id);

  if (!buktiPelunasan) {
    return { notFound: true };
  }

  return {
    title: `${buktiPelunasan.no_bp ?? "Tambah"} | Bukti Pelunasan`,
  };
}

export default async function BuktiPelunasanDetail({
  params,
}: {
  params: { buktiPelunasanId: string };
}) {
  const buktiPelunasanId = params.buktiPelunasanId;
  const buktiPelunasan = await getBuktiPelunasanDetail(buktiPelunasanId);

  if (!buktiPelunasan) {
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
            <TambahBuktiPelunasan buktiPelunasanId={buktiPelunasan} />
            {/* terakhir kali ingin membuat komponen detail dari buktipelunasan */}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
