"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getTandaTerimaTagihanUniqe(id: string) {
  const tandaTerimaTagihan = await prisma.tandaTerimaTagihan.findUnique({
    where: {
      id: id,
    },
  });
  return tandaTerimaTagihan;
}

export async function getTandaTerimaTagihanDetail(
  tandaTerimaTagihanId: string
) {
  const faktur = await prisma.tandaTerimaTagihan.findUnique({
    where: { id: tandaTerimaTagihanId },
  });
  return faktur;
}

export async function createTandaTerimaTagihanDetail(
  formData: FormData,
  tandaTerimaTagihanId: string
) {
  const purchaseOrderId = await prisma.fakturPajak.findUnique({
    where: { id: tandaTerimaTagihanId },
    include: {
      purchase_order: true,
    },
  });

  const values = Object.fromEntries(formData.entries());

  await prisma.tandaTerimaTagihan.update({
    where: {
      id: tandaTerimaTagihanId,
    },
    data: {
      ...values,
    },
  });
  revalidatePath(`/dashboard/detail/${purchaseOrderId?.purchase_order.id}`);
  redirect(`/dashboard/detail/${purchaseOrderId?.purchase_order.id}`);
}