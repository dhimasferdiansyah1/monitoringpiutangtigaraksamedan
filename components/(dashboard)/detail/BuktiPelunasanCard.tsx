import { Card } from "@/components/ui/card";
import { getAllDetail } from "@/actions/actionDetail";
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
import { formatDateIsoFetch } from "@/lib/utils";
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BuktiPelunasanCard({
  params,
}: {
  params: { id: string };
}) {
  const buktiPelunasan = await getAllDetail(params.id);

  if (!buktiPelunasan) {
    return <p>Tidak ada bukti pelunasan</p>;
  }
  return (
    <Card className="flex w-full flex-col overflow-auto text-wrap p-4 shadow-none dark:bg-zinc-900">
      <div className="flex items-start gap-2">
        <p className="min-w-12 max-w-24 text-balance">No. Bukti pelunasan</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {buktiPelunasan.buktipelunasan?.no_bp || (
            <p className="text-destructive dark:text-red-400">Tidak memiliki</p>
          )}
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">Tgl. Bukti Pelunasan</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {formatDateIsoFetch(
            buktiPelunasan.buktipelunasan?.createdAt?.toISOString()
          ) || (
            <p className="text-destructive dark:text-red-400">Tidak memiliki</p>
          )}
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">Foto Bukti Pelunasan</p>
        <span>:</span>
        <div>
          <div className=" break-all text-muted-foreground">
            {buktiPelunasan.buktipelunasan?.foto_bp ? (
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
                    Foto faktur {buktiPelunasan.buktipelunasan?.no_bp}
                  </DialogTitle>
                  <DialogDescription>
                    {buktiPelunasan.buktipelunasan?.foto_bp ? (
                      <>
                        <Image
                          src={buktiPelunasan.buktipelunasan?.foto_bp}
                          alt={`Foto faktur ${buktiPelunasan.buktipelunasan?.foto_bp}`}
                          width={512}
                          height={512}
                          className="mb-4 h-[550px] w-auto object-contain"
                        />
                        <a
                          href={buktiPelunasan.buktipelunasan?.foto_bp}
                          target="_blank"
                          className="mt-4"
                        >
                          Lihat full resolusi gambar
                        </a>
                      </>
                    ) : (
                      <div className="rounded border border-dashed p-2 py-4 text-center text-gray-500">
                        <p>
                          Bukti Pelunasan tidak memiliki gambar yang di upload
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
