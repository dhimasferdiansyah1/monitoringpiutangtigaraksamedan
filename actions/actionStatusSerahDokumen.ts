"use server";

import prisma from "@/lib/prisma";
import { statusSerahDokumenSchema } from "@/types/statusSerahDokumen";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getStatusSerahDokumenUniqe(id: string) {
  const purchaseOrder = await prisma.purchaseOrder.findUnique({
    where: {
      id: id,
    },
    include: {
      statusserahdokumen: true,
    },
  });
  return purchaseOrder;
}

export async function createStatusSerahDokumenDetail(
  formData: FormData,
  id: string
) {
  const purchaseOrderId = await prisma.purchaseOrder.findUnique({
    where: {
      id: id,
    },
  });
  const values = Object.fromEntries(formData.entries());
  const { status_serah } = statusSerahDokumenSchema.parse(values);

  await prisma.purchaseOrder.update({
    where: {
      id: id,
    },
    data: {
      statusserahdokumen: {
        create: {
          status_serah: status_serah,
          user: "Sales",
        },
      },
    },
  });
  revalidatePath(`/dashboard/detail/${purchaseOrderId?.id}`);
  redirect(`/dashboard/detail/${purchaseOrderId?.id}`);
}

export async function deleteStatusSerahDokumen(id: string) {
  const purchaseOrderId = await prisma.purchaseOrder.findUnique({
    where: {
      id: id,
    },
  });

  try {
    await prisma.statusSerahDokumen.delete({
      where: {
        id: id,
        po_id: purchaseOrderId?.id,
      },
    });
    revalidatePath(`/dashboard/detail/${purchaseOrderId?.id}`);
  } catch (error) {
    console.log(error);
  }
}