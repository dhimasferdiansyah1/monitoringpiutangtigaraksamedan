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

  // Fungsi untuk menghapus tanda titik (.) dari string
  function removePeriod(value: string) {
    return value.replace(/\./g, "");
  }

  // Fungsi untuk menghapus awalan 'Rp' dari string
  function removeRpPrefix(value: string) {
    return value.replace(/^Rp\s?/i, "");
  }

  // Menghapus tanda titik (.) dan awalan 'Rp' dari nilai sebelum menyimpan ke database
  const valueWithoutPeriodAndRpPrefix = removeRpPrefix(removePeriod(nilai));

  await prisma.faktur.update({
    where: {
      id: fakturId,
    },
    data: {
      no_fk,
      tgl_fk,
      tgl_jt,
      nilai: valueWithoutPeriodAndRpPrefix,
      foto1_fk,
      foto2_fk,
    },
  });

  revalidatePath(`/dashboard/detail/${purchaseOrderId?.purchase_order.id}`);
  redirect(`/dashboard/detail/${purchaseOrderId?.purchase_order.id}`);
}
