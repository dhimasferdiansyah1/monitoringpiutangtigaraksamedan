import { Card } from "@/components/ui/card";

import { formatDateIsoFetch } from "@/lib/utils";
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
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function FakturCard({
  params,
}: {
  params: { id: string };
}) {
  const faktur = await getAllDetail(params.id);

  function convertUTCDateToLocalDate(date: Date) {
    var newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return newDate;
  }

  var date: Date | undefined = undefined;
  if (faktur?.faktur?.tgl_fk) {
    date = convertUTCDateToLocalDate(new Date(faktur.faktur.tgl_fk));
  }

  console.log(date);

  if (!faktur) {
    return <p>Tidak ada faktur</p>;
  }
  return (
    <Card className="flex w-full flex-col overflow-auto text-wrap p-4 shadow-none dark:bg-zinc-900">
      <div className="flex items-start gap-2">
        <p className="min-w-24 max-w-24 text-balance">No. Faktur</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {faktur.faktur?.no_fk || (
            <p className="text-destructive dark:text-red-400">Tidak memiliki</p>
          )}
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">Tgl. Faktur</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {formatDateIsoFetch(faktur.faktur?.tgl_fk?.toISOString()) || (
            <span className="text-destructive dark:text-red-400">
              Tidak memiliki
            </span>
          )}
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">Tgl. jatuh tempo</p>
        <span>:</span>
        <div>
          <div className=" break-all text-muted-foreground">
            {formatDateIsoFetch(faktur.faktur?.tgl_jt?.toISOString()) || (
              <span className="text-destructive dark:text-red-400">
                Tidak memiliki
              </span>
            )}
          </div>
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">Nilai</p>
        <span>:</span>
        <div>
          <div className=" break-all text-muted-foreground">
            {faktur.faktur?.nilai || (
              <span className="text-destructive dark:text-red-400">
                Tidak memiliki
              </span>
            )}
          </div>
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">Foto faktur 1</p>
        <span>:</span>
        <div>
          <div className=" break-all text-muted-foreground">
            <div className=" break-all text-muted-foreground">
              {faktur.faktur?.foto1_fk ? (
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
                      Foto faktur {faktur?.faktur?.foto1_fk}
                    </DialogTitle>
                    <DialogDescription>
                      {faktur?.faktur?.foto1_fk ? (
                        <>
                          <Image
                            src={faktur?.faktur?.foto1_fk}
                            alt={`Foto faktur ${faktur?.faktur?.foto1_fk}`}
                            width={512}
                            height={512}
                            className="mb-4 h-[550px] w-auto object-contain"
                          />
                          <a
                            href={faktur?.faktur?.foto1_fk}
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
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">Foto faktur 2</p>
        <span>:</span>
        <div>
          <div className=" break-all text-muted-foreground">
            {faktur?.faktur?.foto2_fk ? (
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
                    Foto faktur {faktur?.faktur?.foto2_fk}
                  </DialogTitle>
                  <DialogDescription>
                    {faktur?.faktur?.foto2_fk ? (
                      <>
                        <Image
                          src={faktur?.faktur?.foto2_fk}
                          alt={`Foto faktur ${faktur?.faktur?.foto2_fk}`}
                          width={512}
                          height={512}
                          className="mb-4 h-[550px] w-auto object-contain"
                        />
                        <a
                          href={faktur?.faktur?.foto2_fk}
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
