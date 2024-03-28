"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ITEM_PER_PAGE = 6;

export async function getCustomerPurchaseOrderUniqe(id: string) {
  const purchaseOrder = await prisma.customer.findUnique({
    where: {
      id: id,
    },
    include: {
      purchase_order: true,
    },
  });
  return purchaseOrder;
}

export async function getCustomerPurchaseOrderById(
  query: string,
  currentPage: number,
  id: string
) {
  const take = ITEM_PER_PAGE;
  const skip = (currentPage - 1) * take; // Calculate skip based on current page
  const today = new Date().toISOString().slice(0, 10); // Get today's date

  const purchaseOrders = await prisma.purchaseOrder.findMany({
    where: {
      customer_id: id,
      OR: [
        {
          no_po: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          delivery_note: {
            no_dn: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
        // Add more OR conditions for other searchable fields
      ],
    },
    orderBy: {
      createdAt: "desc",
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
    skip,
    take,
  });

  return purchaseOrders;
}

export async function getCustomerPurchaseOrderByIdPages(query: string) {
  const response = await prisma.purchaseOrder.count({
    where: {
      OR: [
        {
          no_po: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          delivery_note: {
            no_dn: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      ],
    },
  });
  const totalPages = Math.ceil(Number(response) / ITEM_PER_PAGE);
  return totalPages;
}

export async function deleteCustomerPurchaseOrderById(id: string) {
  try {
    await prisma.purchaseOrder.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard");
    redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
}

//count jatuh tempo
export async function getJatuhTempoCount(id: string) {
  const today = new Date().toISOString(); // Get today's date
  const jatuhTempoCount = await prisma.purchaseOrder.count({
    where: {
      customer_id: id,
      faktur: {
        tgl_jt: {
          lte: today,
        },
      },
    },
  });
  return jatuhTempoCount;
}
