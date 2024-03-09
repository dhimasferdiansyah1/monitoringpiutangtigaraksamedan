import prisma from "@/lib/prisma";

const ITEM_PER_PAGE = 6;

export async function getJatuhTempo(currentPage: number) {
  const offset = (currentPage - 1) * ITEM_PER_PAGE;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate filtering

  const jatuhTempo = await prisma.purchaseOrder.findMany({
    skip: offset,
    take: ITEM_PER_PAGE,
    where: {
      OR: [
        // Use OR to find purchaseOrders with at least one matching faktur.tgl_jt
        {
          faktur: {
            NOT: {
              // Exclude purchaseOrders without a faktur
              no_fk: null,
            },
            tgl_jt: {
              lte: today, // Filter for due dates on or before today
            },
          },
        },
        {
          faktur: null, // Include purchaseOrders without a faktur (optional)
        },
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
  });

  return jatuhTempo;
}

export async function getJatuhTempoPages(currentPage: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time for consistency

  const response = await prisma.purchaseOrder.count({
    where: {
      OR: [
        // Use OR to find purchaseOrders with at least one matching faktur.tgl_jt
        {
          faktur: {
            NOT: {
              // Exclude purchaseOrders without a faktur
              no_fk: null,
            },
            tgl_jt: {
              lte: today, // Filter for due dates on or before today
            },
          },
        },
        {
          faktur: null, // Include purchaseOrders without a faktur (optional)
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalPages = Math.ceil(Number(response) / ITEM_PER_PAGE);
  return totalPages;
}
