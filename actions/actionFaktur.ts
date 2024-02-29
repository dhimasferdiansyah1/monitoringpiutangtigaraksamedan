"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { editFakturSchema } from "@/types/faktur";

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
  const { no_fk, tgl_fk, tgl_jt, nilai, foto1_fk, foto2_fk } =
    editFakturSchema.parse(values);

  await prisma.faktur.update({
    where: {
      id: fakturId,
    },
    data: {
      no_fk,
      tgl_fk,
      tgl_jt,
      nilai,
      foto1_fk,
      foto2_fk,
    },
  });
  revalidatePath(`/dashboard/detail/${purchaseOrderId?.purchase_order.id}`);
  redirect(`/dashboard/detail/${purchaseOrderId?.purchase_order.id}`);
}
