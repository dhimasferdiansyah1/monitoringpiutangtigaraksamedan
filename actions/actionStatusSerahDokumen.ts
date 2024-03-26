"use server";

import prisma from "@/lib/prisma";
import { statusSerahDokumenSchema } from "@/types/statusSerahDokumen";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";

export async function getStatusSerahDokumenUniqe(id: string) {
  const statusSerahDokumen = await prisma.purchaseOrder.findUnique({
    where: {
      id: id,
    },
    include: {
      statusserahdokumen: true,
    },
  });
  return statusSerahDokumen;
}

export async function createStatusSerahDokumenDetail(
  formData: FormData,
  id: string
) {
  const { userId } = auth();
  const user = await currentUser();
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
          user: user?.username,
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

export async function getStatusSerahDokumenList() {
  try {
    const status = await prisma.purchaseOrder.findMany({
      include: {
        customer: true,
        faktur: true,
        faktur_pajak: true,
        delivery_note: true,
        tandaterimatagihan: true,
        statusserahdokumen: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });
    return status;
  } catch (error) {
    console.error(error);
  }
}