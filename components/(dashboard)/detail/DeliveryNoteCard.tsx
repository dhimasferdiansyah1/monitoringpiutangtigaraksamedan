import { getDeliveryNoteUniqe } from "@/actions/actionDeliveryNote";
import { Card } from "@/components/ui/card";
import Link from "next/link";
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
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DeliveryNoteCard({
  deliveryNoteId,
}: {
  deliveryNoteId: string;
}) {
  const deliveryNote = await getDeliveryNoteUniqe(deliveryNoteId);
  return (
    <Card className="flex w-full flex-col overflow-auto text-wrap p-4 shadow-none dark:bg-zinc-900">
      <div className="flex items-start gap-2">
        <p className="min-w-12 max-w-24 text-balance">No. Delivery Note</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {deliveryNote?.no_dn || (
            <p className="text-destructive">Tidak memiliki</p>
          )}
        </div>
      </div>
      <hr className="my-1.5" />
      <div className="flex gap-2">
        <p className="min-w-24 max-w-24 text-balance">
          Foto sebelum delivery 1
        </p>
        <span>:</span>
        <div>
          <div className=" break-all text-muted-foreground">
            <div className=" break-all text-muted-foreground">
              {deliveryNote?.foto1_dn ? (
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
                      Foto Delivery Note {deliveryNote?.foto1_dn}
                    </DialogTitle>
                    <DialogDescription>
                      {deliveryNote?.foto1_dn ? (
                        <>
                          <Image
                            src={deliveryNote?.foto1_dn}
                            alt={`Foto faktur ${deliveryNote.foto1_dn}`}
                            width={1000}
                            height={1000}
                            className="mb-4 h-[550px] w-auto"
                          />
                          <a
                            href={deliveryNote.foto1_dn}
                            target="_blank"
                            className="mt-4"
                          >
                            Lihat full resolusi gambar
                          </a>
                        </>
                      ) : (
                        <div className="rounded border border-dashed p-2 py-4 text-center text-gray-500">
                          <p>
                            Delivery Note tidak memiliki gambar yang di upload
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
        <p className="min-w-24 max-w-24 text-balance">Foto sesudah delivery</p>
        <span>:</span>
        <div>
          <div className=" break-all text-muted-foreground">
            {deliveryNote?.foto2_dn ? (
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
                    Foto Delivery Note {deliveryNote?.foto2_dn}
                  </DialogTitle>
                  <DialogDescription>
                    {deliveryNote?.foto2_dn ? (
                      <>
                        <Image
                          src={deliveryNote?.foto2_dn}
                          alt={`Foto faktur ${deliveryNote.foto2_dn}`}
                          width={1000}
                          height={1000}
                          className="mb-4 h-[550px] w-auto"
                        />
                        <a
                          href={deliveryNote.foto2_dn}
                          target="_blank"
                          className="mt-4"
                        >
                          Lihat full resolusi gambar
                        </a>
                      </>
                    ) : (
                      <div className="rounded border border-dashed p-2 py-4 text-center text-gray-500">
                        <p>
                          Delivery Note tidak memiliki gambar yang di upload
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
