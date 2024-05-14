"use server";
import prisma from "@/lib/prisma";
import { parseISO } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

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
    const startDate = month
      ? new Date(year, month - 1, 1)
      : new Date(year, 0, 1);
    const endDate = month ? new Date(year, month, 1) : new Date(year + 1, 0, 1);

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
    const DAYS = await calculateDays(year, month);

    return { status, AR, SALES, OD, percentageOD, DAYS };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function calculateAR(year: number, month?: number): Promise<number> {
  const lastYear = year - 1;
  const startOfPeriod = month
    ? new Date(lastYear, 11, 1)
    : new Date(lastYear, 0, 1);
  const endOfPeriod = month
    ? new Date(year, month - 1, 1)
    : new Date(year, 0, 1);

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
    ? new Date(year, month - 1, 1)
    : new Date(year, 0, 1);
  const endOfPeriod = month
    ? new Date(year, month, 1)
    : new Date(year + 1, 0, 1);

  const purchaseOrders = await prisma.purchaseOrder.findMany({
    where: {
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
    ? new Date(year, month - 1, 1)
    : new Date(year, 0, 1);
  const endOfPeriod = month
    ? new Date(year, month, 1)
    : new Date(year + 1, 0, 1);

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

  let totalOD = 0;
  for (const po of purchaseOrders) {
    if (po.faktur?.nilai) {
      totalOD += parseFloat(po.faktur.nilai);
    }
  }

  return totalOD;
}

async function calculateDays(year: number, month?: number): Promise<number> {
  const lastMonth = month ? month - 1 : 11;
  const lastYear = month ? year : year - 1;
  const ARLastMonth = await calculateAR(lastYear, lastMonth);
  const salesLastMonth = await calculateSales(lastYear, lastMonth);
  const salesThisMonth = await calculateSales(year, month);

  const averageSales = (salesLastMonth + salesThisMonth) / 2;
  const days = (ARLastMonth / (averageSales || 1)) * 30;

  return Math.round(days);
}

