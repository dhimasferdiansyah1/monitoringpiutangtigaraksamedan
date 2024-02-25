"use server";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getFakturUniqe(id: string) {
  const faktur = await prisma.faktur.findUnique({
    where: {
      id: id,
    },
  });
  return faktur;
}

export async function getFakturDetail(fakturId: string) {
  const faktur = await prisma.faktur.findUnique({
    where: { id: fakturId },
  });
  return faktur;
}

export async function createFakturDetail(formData: FormData, fakturId: string) {
  const purchaseOrderId = await prisma.faktur.findUnique({
    where: { id: fakturId },
    include: {
      purchase_order: true,
    },
  });

  const values = Object.fromEntries(formData.entries());

  await prisma.faktur.update({
    where: {
      id: fakturId,
    },
    data: {
      ...values,
    },
  });
  revalidatePath(`/dashboard/detail/${purchaseOrderId?.purchase_order.id}`);
  redirect(`/dashboard/detail/${purchaseOrderId?.purchase_order.id}`);
}
