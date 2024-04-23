"use server";
import prisma from "@/lib/prisma";
import { TambahPurchaseOrderSchema } from "@/types/purchaseOrder";
import { uuidModified, uuidModifiedShort } from "@/lib/utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";

export async function createPurchaseOrder(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { customer_id, no_po, tgl_po, foto_po, status_po, status_serah } =
    TambahPurchaseOrderSchema.parse(values);

 const nomorPurchaseOrderWithoutPeriods = no_po.replace(/\./g, "");

 const idFormat = uuidModified() + "-" + nomorPurchaseOrderWithoutPeriods;
 const idDeliveryNoteFormat =
   nomorPurchaseOrderWithoutPeriods + "-" + "dn" + uuidModifiedShort();
 const idFakturFormat =
   nomorPurchaseOrderWithoutPeriods + "-" + "fk" + uuidModifiedShort();
 const idFakturPajakFormat =
   nomorPurchaseOrderWithoutPeriods + "-" + "fkp" + uuidModifiedShort();
 const idTandaTerimaTagihanFormat =
   nomorPurchaseOrderWithoutPeriods + "-" + "ttt" + uuidModifiedShort();
 const idStatusSerahDokumenFormat =
   nomorPurchaseOrderWithoutPeriods + "-" + "ssd" + uuidModifiedShort();
  const { userId } = auth();
  const user = await currentUser();
  const hasFoto2Dn = formData.has("foto2_dn");

  const userInfo = await prisma.userInfo.findUnique({
    where: {
      clerkId: userId || undefined,
    },
  });

  try {
    await prisma.purchaseOrder.create({
      data: {
        id: idFormat,
        customer_id,
        no_po,
        tgl_po,
        foto_po,
        status_po: "Baru", // Conditional update

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
            user: user?.username,
            role: userInfo?.role,
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
