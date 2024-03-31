"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ITEM_PER_PAGE = 6;

export async function getPemegangDokumenKolektor(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEM_PER_PAGE;

  const mainMonitoring = await prisma.purchaseOrder.findMany({
    skip: offset,
    take: ITEM_PER_PAGE,
    orderBy: {
      createdAt: "desc",
    },
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
        {
          faktur: {
            no_fk: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      ],
      statusserahdokumen: {
        some: {
          OR: [
            {
              status_serah: {
                contains:
                  "Admin inkaso menyerahkan dokumen ke kolektor untuk proses tukar faktur",
              },
            },
            {
              status_serah: {
                contains: "Kolektor melakukan tukar faktur ke toko",
              },
            },
            {
              status_serah: {
                contains: "Kolektor sampai di toko untuk proses tukar faktur",
              },
            },
            {
              status_serah: {
                contains: "Kolektor selesai melakukan tukar faktur",
              },
            },
            {
              status_serah: {
                contains:
                  "Admin inkaso menyerahkan dokumen ke kolektor dalam proses penagihan ke toko",
              },
            },
            {
              status_serah: {
                contains: "Kolektor melakukan penagihan piutang ke toko",
              },
            },
            {
              status_serah: {
                contains:
                  "Kolektor sampai di toko untuk proses penagihan piutang",
              },
            },
            {
              status_serah: {
                contains: "Kolektor selesai melakukan penagihan piutang",
              },
            },
            {
              status_serah: {
                contains:
                  "Kolektor menyerahkan dokumen ke admin inkaso setelah selesai penagihan",
              },
            },
            {
              status_serah: {
                contains: "Kolektor menyerahkan giro ke kasir",
              },
            },
            {
              status_serah: {
                contains: "Kolektor menyerahkan tunai ke kasir",
              },
            },
          ],
        },
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

export async function getPemegangDokumenKolektorPages(query: string) {
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

export async function deleteMainMonitoring(id: string) {
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
