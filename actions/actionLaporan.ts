"use server";
import prisma from "@/lib/prisma";

interface LaporanListData {
  status: any[];
  AR: number;
  SALES: number;
  OD: number;
  percentageOD: number;
  DAYS: number;
}

export async function getLaporanList({
  month,
  year,
}: {
  month?: number;
  year: number;
}): Promise<LaporanListData> {
  try {
    const currentMonth = month || new Date().getMonth() + 1; // Bulan saat ini jika tidak ditentukan
    const currentYear = year || new Date().getFullYear(); // Tahun saat ini jika tidak ditentukan

    // Hitung AR, SALES, dan OD untuk bulan ini
    const ARCurrentMonth = await calculateAR(currentYear, currentMonth);
    const SALESCurrentMonth = await calculateSales(currentYear, currentMonth);
    const ODCurrentMonth = await calculateOD(currentYear, currentMonth);

    // Hitung AR, SALES, dan OD untuk bulan lalu
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const lastYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const ARLastMonth = await calculateAR(lastYear, lastMonth);
    const SALESLastMonth = await calculateSales(lastYear, lastMonth);

    // Hitung DAYS
    const DAYS =
      ARLastMonth > 0
        ? Math.round(
            (ARLastMonth / ((SALESLastMonth + SALESCurrentMonth) / 2)) * 30
          )
        : 0;

    // Hitung OD%
    const percentageOD =
      ARCurrentMonth > 0
        ? Math.round((ODCurrentMonth / ARCurrentMonth) * 100)
        : 0;

    // Ambil data status Purchase Order
    const status = await prisma.purchaseOrder.findMany({
      where: {
        faktur: {
          tgl_fk: {
            gte: new Date(currentYear, currentMonth - 1, 1),
            lt: new Date(currentYear, currentMonth, 1),
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

    return {
      status,
      AR: ARCurrentMonth,
      SALES: SALESCurrentMonth,
      OD: ODCurrentMonth,
      percentageOD,
      DAYS,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function calculateAR(year: number, month: number): Promise<number> {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const purchaseOrders = await prisma.purchaseOrder.findMany({
    where: {
      status_po: {
        not: "Selesai",
      },
      faktur: {
        tgl_fk: {
          gte: startDate,
          lt: endDate,
        },
      },
      // Tambahkan kondisi untuk mengecualikan PO yang sudah dilunasi di bulan sebelumnya
      NOT: {
        tandaterimatagihan: {
          tgl_jt: {
            lt: startDate, // PO yang sudah dilunasi sebelum bulan ini
          },
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

async function calculateSales(year: number, month: number): Promise<number> {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const purchaseOrders = await prisma.purchaseOrder.findMany({
    where: {
      faktur: {
        tgl_fk: {
          gte: startDate,
          lt: endDate,
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

async function calculateOD(year: number, month: number): Promise<number> {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const purchaseOrders = await prisma.purchaseOrder.findMany({
    where: {
      status_po: {
        not: "Selesai",
      },
      faktur: {
        tgl_fk: {
          lt: endDate, // Jatuh tempo sebelum akhir bulan ini
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
