import { getDeliveryNoteUniqe } from "@/actions/actionDeliveryNote";
import { getAllDetail } from "@/actions/actionDetail";
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

export default async function DeliveryNoteCard({
  params,
}: {
  params: { id: string };
}) {
  const deliveryNote = await getAllDetail(params.id);

  if (!deliveryNote?.delivery_note?.no_dn === undefined) {
    return <p>Delivery note not found</p>;
  }

  return (
    <Card className="flex w-full flex-col overflow-auto text-wrap p-4 shadow-none dark:bg-zinc-900">
      <div className="flex items-start gap-2">
        <p className="min-w-12 max-w-24 text-balance">No. Delivery Note</p>
        <span>:</span>
        <div className=" break-all text-muted-foreground">
          {deliveryNote?.delivery_note?.no_dn || (
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
              {deliveryNote?.delivery_note?.foto1_dn ? (
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
                      Foto Delivery Note {deliveryNote?.delivery_note?.foto1_dn}
                    </DialogTitle>
                    <DialogDescription>
                      {deliveryNote?.delivery_note?.foto1_dn ? (
                        <>
                          <Image
                            src={deliveryNote.delivery_note.foto1_dn}
                            alt={`Foto faktur ${deliveryNote.delivery_note.foto1_dn}`}
                            width={512}
                            height={512}
                            className="mb-4 h-[550px] w-auto object-contain"
                          />
                          <a
                            href={deliveryNote.delivery_note.foto1_dn}
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
            {deliveryNote?.delivery_note?.foto2_dn ? (
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
                    Foto Delivery Note {deliveryNote?.delivery_note?.foto2_dn}
                  </DialogTitle>
                  <DialogDescription>
                    {deliveryNote?.delivery_note?.foto2_dn ? (
                      <>
                        <Image
                          src={deliveryNote?.delivery_note.foto2_dn}
                          alt={`Foto faktur ${deliveryNote.delivery_note.foto2_dn}`}
                          width={512}
                          height={512}
                          className="mb-4 h-[550px] w-auto object-contain"
                        />
                        <a
                          href={deliveryNote.delivery_note.foto2_dn}
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
