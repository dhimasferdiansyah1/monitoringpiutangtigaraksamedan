"use server";

import TambahPurchaseOrder from "@/components/(dashboard)/detail/purchaseorder/FormDetailPurchaseOrder";
import prisma from "@/lib/prisma";
import {
  EditPurchaseOrderShcema,
  TambahPurchaseOrderSchema,
} from "@/types/purchaseOrder";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPurchaseOrderUniqe(id: string) {
  const purchaseOrder = await prisma.purchaseOrder.findUnique({
    where: {
      id: id,
    },
  });
  return purchaseOrder;
}

export async function createPurchaseOrderDetail(
  formData: FormData,
  id: string
) {
  const purchaseOrderId = await prisma.purchaseOrder.findUnique({
    where: {
      id: id,
    },
  });
  const values = Object.fromEntries(formData.entries());
  const { no_po, tgl_po, foto_po } = EditPurchaseOrderShcema.parse(values);

  await prisma.purchaseOrder.update({
    where: {
      id: id,
    },
    data: {
      no_po,
      tgl_po,
      foto_po,
    },
  });
  revalidatePath(`/dashboard/detail/${purchaseOrderId?.id}`);
  redirect(`/dashboard/detail/${purchaseOrderId?.id}`);
}
