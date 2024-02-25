import { Card } from "@/components/ui/card";
import { getTandaTerimaTagihanUniqe } from "@/actions/actionTandaTerimaTagihan";
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TandaTerimaTagihanCard({
  tandaTerimaTagihanId,
}: {
  tandaTerimaTagihanId: string;
}) {
  const ttt = await getTandaTerimaTagihanUniqe(tandaTerimaTagihanId);
  return (
    <Card className="flex w-full flex-col overflow-auto text-wrap p-4 shadow-none dark:bg-zinc-900">
      <div className="flex items-start gap-2">
        <p className="min-w-24 max-w-24 text-balance">No. Penagihan</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {ttt?.no_penagihan || (
            <p className="text-destructive dark:text-red-400">Tidak memiliki</p>
          )}
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">Status</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {ttt?.status || (
            <p className="text-destructive dark:text-red-400">Tidak memiliki</p>
          )}
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">
          Tgl. jatuh tempo Penagihan
        </p>
        <span>:</span>
        <div>
          <div className=" break-all text-muted-foreground">
            {(ttt?.tgl_jt?.toISOString() ?? "") || (
              <span className="text-destructive dark:text-red-400">
                Tidak memiliki
              </span>
            )}
          </div>
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">
          Foto Tanda Terima Tagihan
        </p>
        <span>:</span>
        <div>
          <div className=" break-all text-muted-foreground">
            {ttt?.foto_ttt || (
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
