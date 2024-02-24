"use server";
import prisma from "@/lib/prisma";
import { TambahPurchaseOrderSchema } from "@/types/purchaseOrder";
import { uuidModified, uuidModifiedShort } from "@/lib/utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createPurchaseOrder(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { customer_id, no_po, tgl_po, foto_po, status_po, status_serah, user } =
    TambahPurchaseOrderSchema.parse(values);

  const nomorPurchaseOrder = no_po;
  const nomorPurchaseOrderWithoutExt = nomorPurchaseOrder;

  const idFormat = uuidModified() + "-" + nomorPurchaseOrderWithoutExt;
  const idDeliveryNoteFormat =
    nomorPurchaseOrderWithoutExt + "-" + "dn" + uuidModifiedShort();
  const idFakturFormat =
    nomorPurchaseOrderWithoutExt + "-" + "fk" + uuidModifiedShort();
  const idFakturPajakFormat =
    nomorPurchaseOrderWithoutExt + "-" + "fkp" + uuidModifiedShort();
  const idTandaTerimaTagihanFormat =
    nomorPurchaseOrderWithoutExt + "-" + "ttt" + uuidModifiedShort();
  const idStatusSerahDokumenFormat =
    nomorPurchaseOrderWithoutExt + "-" + "ssd" + uuidModifiedShort();

  try {
    await prisma.purchaseOrder.create({
      data: {
        id: idFormat,
        customer_id,
        no_po,
        tgl_po,
        foto_po,
        status_po,

        delivery_note: {
          create: {
            id: idDeliveryNoteFormat,
          },
        },

        faktur: {
          create: {
            id: idFakturFormat,
          },
        },

        faktur_pajak: {
          create: {
            id: idFakturPajakFormat,
          },
        },

        tandaterimatagihan: {
          create: {
            id: idTandaTerimaTagihanFormat,
          },
        },

        statusserahdokumen: {
          create: {
            id: idStatusSerahDokumenFormat,
            status_serah: status_serah,
            user: "Sales",
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
