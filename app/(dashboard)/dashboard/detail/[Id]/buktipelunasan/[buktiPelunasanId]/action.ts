"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { editBuktiPelunasanSchema } from "@/types/buktiPelunasan";

export async function getBuktiPelunasanDetailUniqe(id: string) {
  const buktiPelunasan = await prisma.buktiPelunasan.findUnique({
    where: {
      id: id,
    },
  });
  return buktiPelunasan;
}

export async function getBuktiPelunasanDetail(buktiPelunasanId: string) {
  const buktiPelunasan = await prisma.buktiPelunasan.findUnique({
    where: { id: buktiPelunasanId },
  });
  return buktiPelunasan;
}

export async function createBuktiPelunasanDetail(
  formData: FormData,
  buktiPelunasanId: string
) {
  const purchaseOrderId = await prisma.buktiPelunasan.findUnique({
    where: { id: buktiPelunasanId },
    include: {
      purchase_order: true,
    },
  });

  const values = Object.fromEntries(formData.entries());
  const { no_bp, foto_bp } = editBuktiPelunasanSchema.parse(values);

  await prisma.buktiPelunasan.update({
    where: {
      id: buktiPelunasanId,
    },
    data: {
      no_bp,
      foto_bp,
    },
  });
  revalidatePath(
    `/dashboard/monitoring/detail/${purchaseOrderId?.purchase_order.id}`
  );
  redirect(
    `/dashboard/monitoring/detail/${purchaseOrderId?.purchase_order.id}`
  );
}
