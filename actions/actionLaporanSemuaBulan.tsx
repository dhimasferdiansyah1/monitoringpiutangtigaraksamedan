"use server";
import prisma from "@/lib/prisma";

interface LaporanListData {
  status: any[];
  AR: number;
  SALES: number;
  OD: number;
  percentageOD: number;
}

export async function getLaporanSemuaBulanList({
  year,
}: {
  year: number;
}): Promise<LaporanListData> {
  try {
    const startDate = new Date(year, 0, 1); // Awal tahun
    const endDate = new Date(year + 1, 0, 1); // Awal tahun berikutnya

    const status = await prisma.purchaseOrder.findMany({
      where: {
        faktur: {
          tgl_fk: {
            gte: startDate,
            lt: endDate,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
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

    const AR = await calculateAR(year);
    const SALES = await calculateSales(year);
    const OD = await calculateOD(year);
    const percentageOD = AR > 0 ? Math.round((OD / AR) * 100) : 0;

    return { status, AR, SALES, OD, percentageOD };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Fungsi untuk menghitung AR, Sales, dan OD untuk seluruh tahun
async function calculateAR(year: number): Promise<number> {
  const lastYear = year - 1;
  const startOfLastYear = new Date(`${lastYear}-12-01`);
  const endOfLastYear = new Date(`${year}-01-01`);

  const purchaseOrders = await prisma.purchaseOrder.findMany({
    where: {
      status_po: "Belum Selesai",
      faktur: {
        tgl_fk: {
          gte: startOfLastYear,
          lt: endOfLastYear,
        },
      },
    },
    include: {
      faktur: true,
    },
  });

  let totalAR = 0;
  for (const po of purchaseOrders) {
    if (po.faktur?.nilai) {
      totalAR += parseFloat(po.faktur.nilai);
    }
  }

  return totalAR;
}

async function calculateSales(year: number): Promise<number> {
  const startOfYear = new Date(`${year}-01-01`);
  const endOfYear = new Date(`${year + 1}-01-01`);

  const purchaseOrders = await prisma.purchaseOrder.findMany({
    where: {
      status_po: "Selesai",
      faktur: {
        tgl_fk: {
          gte: startOfYear,
          lt: endOfYear,
        },
      },
    },
    include: {
      faktur: true,
    },
  });

  let totalSales = 0;
  for (const po of purchaseOrders) {
    if (po.faktur?.nilai) {
      totalSales += parseFloat(po.faktur.nilai);
    }
  }

  return totalSales;
}

async function calculateOD(year: number): Promise<number> {
  const startOfYear = new Date(`${year}-01-01`);
  const endOfYear = new Date(`${year + 1}-01-01`);

  const purchaseOrders = await prisma.purchaseOrder.findMany({
    where: {
      status_po: "Belum Selesai",
      faktur: {
        tgl_fk: {
          gte: startOfYear,
          lt: endOfYear,
        },
      },
    },
    include: {
      faktur: true,
    },
  });

  let totalOD = 0;
  for (const po of purchaseOrders) {
    if (po.faktur?.nilai) {
      totalOD += parseFloat(po.faktur.nilai);
    }
  }

  return totalOD;
}
