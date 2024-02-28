"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMainMonitoring() {
  const mainMonitoring = await prisma.purchaseOrder.findMany({
    where: {
      id: {
        not: undefined,
      },
    },
    include: {
      customer: true,
      delivery_note: true,
      faktur: true,
      faktur_pajak: true,
      tandaterimatagihan: true,
      statusserahdokumen: {
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return mainMonitoring;
}

export async function deleteMainMonitoring(id: string) {
  try {
    await prisma.purchaseOrder.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
}
