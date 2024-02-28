import { Card } from "@/components/ui/card";
import { getFakturPajakUniqe } from "@/actions/actionFakturPajak";
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

export default async function FakturPajakCard({
  params,
}: {
  params: { id: string };
}) {
  const fakturPajak = await getAllDetail(params.id);

  if (!fakturPajak) {
    return <p>Tidak ada faktur pajak</p>;
  }
  return (
    <Card className="flex w-full flex-col overflow-auto text-wrap p-4 shadow-none dark:bg-zinc-900">
      <div className="flex items-start gap-2">
        <p className="min-w-12 max-w-24 text-balance">No. Faktur Pajak</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {fakturPajak.faktur_pajak?.no_fkp || (
            <p className="text-destructive dark:text-red-400">Tidak memiliki</p>
          )}
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">Tgl. Faktur Pajak</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {(fakturPajak.faktur_pajak?.tgl_fkp?.toISOString() ?? "") || (
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
            {fakturPajak.faktur_pajak?.foto_fkp ? (
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
                    Foto faktur {fakturPajak.faktur_pajak?.no_fkp}
                  </DialogTitle>
                  <DialogDescription>
                    {fakturPajak.faktur_pajak?.foto_fkp ? (
                      <>
                        <Image
                          src={fakturPajak.faktur_pajak?.foto_fkp}
                          alt={`Foto faktur ${fakturPajak.faktur_pajak?.foto_fkp}`}
                          width={512}
                          height={512}
                          className="mb-4 h-[550px] w-auto object-contain"
                        />
                        <a
                          href={fakturPajak.faktur_pajak?.foto_fkp}
                          target="_blank"
                          className="mt-4"
                        >
                          Lihat full resolusi gambar
                        </a>
                      </>
                    ) : (
                      <div className="rounded border border-dashed p-2 py-4 text-center text-gray-500">
                        <p>Faktur Pajak tidak memiliki gambar yang di upload</p>
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
