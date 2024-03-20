import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { getAllDetail } from "@/actions/actionDetail";
import { formatDateIsoFetch } from "@/lib/utils";
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TandaTerimaTagihanCard({
  params,
}: {
  params: { id: string };
}) {
  const ttt = await getAllDetail(params.id);

  if (!ttt) {
    return <p>Tidak ada tanda terima tagihan</p>;
  }
  return (
    <Card className="flex w-full flex-col overflow-auto text-wrap p-4 shadow-none dark:bg-zinc-900">
      <div className="flex items-start gap-2">
        <p className="min-w-24 max-w-24 text-balance">No. Penagihan</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {ttt.tandaterimatagihan?.no_penagihan || (
            <p className="text-destructive dark:text-red-400">Tidak memiliki</p>
          )}
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">Status</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {ttt?.tandaterimatagihan?.status === "belum_selesai" ? (
            "Belum Selesai"
          ) : ttt?.tandaterimatagihan?.status === "selesai" ? (
            "Selesai"
          ) : (
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
            {formatDateIsoFetch(
              ttt?.tandaterimatagihan?.tgl_jt?.toISOString() ?? ""
            ) || (
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
            {ttt?.tandaterimatagihan?.foto_ttt ? (
              <p></p>
            ) : (
              <p className="pb-2 text-center">⚠️silahkan upload foto</p>
            )}
            <Dialog>
              <DialogTrigger className="items center flex gap-2 rounded-md bg-muted p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700/65">
                <ImageIcon className="h-auto w-4 cursor-pointer text-primary" />
                Lihat
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="mb-4">
                    Foto faktur {ttt?.tandaterimatagihan?.no_penagihan}
                  </DialogTitle>
                  <DialogDescription>
                    {ttt?.tandaterimatagihan?.foto_ttt ? (
                      <>
                        <Image
                          src={ttt?.tandaterimatagihan?.foto_ttt}
                          alt={`Foto faktur ${ttt?.tandaterimatagihan?.no_penagihan}`}
                          width={512}
                          height={512}
                          className="mb-4 h-[550px] w-auto object-contain"
                        />
                        <a
                          href={ttt?.tandaterimatagihan?.foto_ttt}
                          target="_blank"
                          className="mt-4"
                        >
                          Lihat full resolusi gambar
                        </a>
                      </>
                    ) : (
                      <div className="rounded border border-dashed p-2 py-4 text-center text-gray-500">
                        <p>
                          Purchase order tidak memiliki gambar yang di upload
                        </p>
                      </div>
                    )}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Card>
  );
}
