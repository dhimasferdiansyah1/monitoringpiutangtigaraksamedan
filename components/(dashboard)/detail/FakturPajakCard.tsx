import { Card } from "@/components/ui/card";
import { getFakturPajakUniqe } from "@/actions/actionFakturPajak";
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function FakturPajakCard({
  fakturPajakId,
}: {
  fakturPajakId: string;
}) {
  const fakturPajak = await getFakturPajakUniqe(fakturPajakId);
  return (
    <Card className="flex w-full flex-col overflow-auto text-wrap p-4 shadow-none dark:bg-zinc-900">
      <div className="flex items-start gap-2">
        <p className="min-w-12 max-w-24 text-balance">No. Faktur Pajak</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {fakturPajak?.no_fkp || (
            <p className="text-destructive dark:text-red-400">Tidak memiliki</p>
          )}
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">Tgl. Faktur Pajak</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {(fakturPajak?.tgl_fkp?.toISOString() ?? "") || (
            <p className="text-destructive dark:text-red-400">Tidak memiliki</p>
          )}
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">Foto Faktur Pajak</p>
        <span>:</span>
        <div>
          <div className=" break-all text-muted-foreground">
            {fakturPajak?.foto_fkp || (
              <span className="text-destructive dark:text-red-400">
                Tidak memiliki
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
