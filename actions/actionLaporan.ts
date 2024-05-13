"use server";
import prisma from "@/lib/prisma";

interface LaporanListData {
  status: any[];
  AR: number;
  SALES: number;
  OD: number;
  percentageOD: number;
}

export async function getLaporanList({
  month,
  year,
}: {
  month?: number;
  year: number;
}): Promise<LaporanListData> {
  try {
    const startDate = month
      ? new Date(year, month - 1, 1) // Awal bulan yang dipilih
      : new Date(year, 0, 1); // Awal tahun
    const endDate = month
      ? new Date(year, month, 1) // Awal bulan berikutnya
      : new Date(year + 1, 0, 1); // Awal tahun berikutnya

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

    const AR = await calculateAR(year, month);
    const SALES = await calculateSales(year, month);
    const OD = await calculateOD(year, month);
    const percentageOD = AR > 0 ? Math.round((OD / AR) * 100) : 0;

    return { status, AR, SALES, OD, percentageOD };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function calculateAR(year: number, month?: number): Promise<number> {
  const lastYear = year - 1;
  const startOfPeriod = month
    ? new Date(lastYear, 11, 1) // Awal Desember tahun sebelumnya
    : new Date(lastYear, 0, 1); // Awal tahun sebelumnya
  const endOfPeriod = month
    ? new Date(year, month - 1, 1) // Awal bulan yang dipilih pada tahun ini
    : new Date(year, 0, 1); // Awal tahun ini

  const purchaseOrders = await prisma.purchaseOrder.findMany({
    where: {
      status_po: {
        not: "Selesai",
      },
      faktur: {
        tgl_fk: {
          gte: startOfPeriod,
          lt: endOfPeriod,
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

async function calculateSales(year: number, month?: number): Promise<number> {
  const startOfPeriod = month
    ? new Date(year, month - 1, 1) // Awal bulan yang dipilih
    : new Date(year, 0, 1); // Awal tahun
  const endOfPeriod = month
    ? new Date(year, month, 1) // Awal bulan berikutnya
    : new Date(year + 1, 0, 1); // Awal tahun berikutnya

  const purchaseOrders = await prisma.purchaseOrder.findMany({
    where: {
      status_po: "Selesai",
      faktur: {
        tgl_fk: {
          gte: startOfPeriod,
          lt: endOfPeriod,
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

async function calculateOD(year: number, month?: number): Promise<number> {
  const startOfPeriod = month
    ? new Date(year, month - 1, 1) // Awal bulan yang dipilih
    : new Date(year, 0, 1); // Awal tahun
  const endOfPeriod = month
    ? new Date(year, month, 1) // Awal bulan berikutnya
    : new Date(year + 1, 0, 1); // Awal tahun berikutnya

  const purchaseOrders = await prisma.purchaseOrder.findMany({
    where: {
      status_po: "Belum Selesai",
      faktur: {
        tgl_fk: {
          gte: startOfPeriod,
          lt: endOfPeriod,
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
