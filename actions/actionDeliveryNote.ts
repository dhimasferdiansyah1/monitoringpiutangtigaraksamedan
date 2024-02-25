"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getDeliveryNoteUniqe(id: string) {
  const deliveryNote = await prisma.deliveryNote.findUnique({
    where: {
      id: id,
    },
  });
  return deliveryNote;
}

export async function getDeliveryNoteDetail(deliveryNoteId: string) {
  const deliveryNote = await prisma.deliveryNote.findUnique({
    where: {
      id: deliveryNoteId,
    },
  });
  return deliveryNote;
}

export async function createDeliveryNoteDetail(
  formData: FormData,
  id: string,
  deliveryNoteId: string
) {
  const purchaseOrderId = await prisma.deliveryNote.findUnique({
    where: {
      id: deliveryNoteId,
    },
    include: {
      purchase_order: true,
    },
  });
  const values = Object.fromEntries(formData.entries());

  await prisma.deliveryNote.update({
    where: {
      id: id,
    },
    data: {
      ...values,
    },
  });
  revalidatePath(`/dashboard/detail/${purchaseOrderId?.purchase_order.id}`);
  redirect(`/dashboard/detail/${purchaseOrderId?.purchase_order.id}`);
}
