"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { editfakturPajakSchema } from "@/types/fakturPajak";

export async function getFakturPajakUniqe(id: string) {
  const fakturPajak = await prisma.fakturPajak.findUnique({
    where: {
      id: id,
    },
  });
  return fakturPajak;
}

export async function getFakturPajakDetail(fakturPajakId: string) {
  const fakturPajak = await prisma.fakturPajak.findUnique({
    where: { id: fakturPajakId },
  });
  return fakturPajak;
}

export async function createFakturPajakDetail(
  formData: FormData,
  fakturPajakId: string
) {
  const purchaseOrderId = await prisma.fakturPajak.findUnique({
    where: { id: fakturPajakId },
    include: {
      purchase_order: true,
    },
  });

  const values = Object.fromEntries(formData.entries());
  const { no_fkp, tgl_fkp, foto_fkp } = editfakturPajakSchema.parse(values);

  await prisma.fakturPajak.update({
    where: {
      id: fakturPajakId,
    },
    data: {
      no_fkp,
      tgl_fkp,
      foto_fkp,
    },
  });
  revalidatePath(`/dashboard/detail/${purchaseOrderId?.purchase_order.id}`);
  redirect(`/dashboard/detail/${purchaseOrderId?.purchase_order.id}`);
}