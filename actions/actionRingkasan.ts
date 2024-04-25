"use server";

import prisma from "@/lib/prisma";

const ITEM_PER_PAGE = 6;

// export async function getRingkasan() {
//   const ringkasan = await prisma.purchaseOrder.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//     include: {
//       customer: true,
//       delivery_note: true,
//       faktur: true,
//       faktur_pajak: true,
//       tandaterimatagihan: true,
//       statusserahdokumen: {
//         take: 1,
//         orderBy: {
//           createdAt: "desc",
//         },
//       },
//     },
//   });

//   return ringkasan;
// }

//ringkasan pendapatan
export async function getRingkasanPendapatan() {
  const currentMonth = new Date().getMonth(); // Get current month (0-indexed)
  const lastMonth = (currentMonth - 1 + 12) % 12; // Get previous month

  const currentMonthRevenue = await getMonthlyRevenue(currentMonth);
  const lastMonthRevenue = await getMonthlyRevenue(lastMonth);
  const allMonthsRevenue = await getAllMonthsRevenue();

  const percentageIncrease = calculatePercentageIncrease(
    lastMonthRevenue,
    currentMonthRevenue
  );

  return {
    currentMonthRevenue,
    lastMonthRevenue,
    percentageIncrease,
    allMonthsRevenue,
  };
}

async function getMonthlyRevenue(month: number) {
  const year = new Date().getFullYear(); // Get current year
  const startDate = new Date(year, month, 1);

  // Adjust year if necessary for endDate
  const endMonth = (month + 1) % 12;
  const endYear = endMonth === 0 ? year + 1 : year;
  const endDate = new Date(endYear, endMonth, 0);

  const ringkasanPendapatan = await prisma.faktur.findMany({
    where: {
      tgl_fk: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      nilai: true,
    },
  });

  const totalPendapatan = ringkasanPendapatan.reduce(
    (total, faktur) => total + parseFloat(faktur.nilai || "0"),
    0
  );
  return totalPendapatan;
}

async function getAllMonthsRevenue() {
  const ringkasanPendapatan = await prisma.faktur.findMany({
    select: {
      nilai: true,
    },
  });

  const totalPendapatan = ringkasanPendapatan.reduce(
    (total, faktur) => total + parseFloat(faktur.nilai || "0"),
    0
  );
  return totalPendapatan;
}

function calculatePercentageIncrease(
  previousValue: number,
  currentValue: number
): number {
  if (previousValue === 0) {
    return 0;
  }
  const increase = ((currentValue - previousValue) / previousValue) * 100;
  return Math.round(increase * 100) / 100; // Round to 2 decimal places accurately
}

export async function getTotalCustomer() {
  const totalCustomer = await prisma.customer.count();
  return totalCustomer;
}

//ringkasan purchase order
export async function getTotalPurchaseOrder() {
  const totalPurchaseOrder = await prisma.purchaseOrder.count();
  return totalPurchaseOrder;
}

export async function getPurchaseOrderSummary() {
  const currentMonth = new Date().getMonth();
  const lastMonth = (currentMonth - 1 + 12) % 12;

  const currentMonthOrders = await getMonthlyPurchaseOrders(currentMonth);
  const lastMonthOrders = await getMonthlyPurchaseOrders(lastMonth);
  const totalOrders = await getTotalPurchaseOrder(); // Reuse existing function

  const orderIncrease = currentMonthOrders - lastMonthOrders;

  return {
    currentMonthOrders,
    lastMonthOrders,
    totalOrders,
    orderIncrease,
  };
}

async function getMonthlyPurchaseOrders(month: number) {
  const year = new Date().getFullYear();
  const startDate = new Date(year, month, 1);

  const endMonth = (month + 1) % 12;
  const endYear = endMonth === 0 ? year + 1 : year;
  const endDate = new Date(endYear, endMonth, 0);

  const count = await prisma.purchaseOrder.count({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
  return count;
}

//ringkasan purchase order aktif
export async function getTotalActivePurchaseOrder() {
  const activeStatuses = [
    "Baru",
    "Pelunasan",
    "Pengantaran",
    "Tukar faktur",
    "Penagihan",
    "Pelunasan",
  ];
  const totalActivePurchaseOrder = await prisma.purchaseOrder.count({
    where: {
      status_po: {
        in: activeStatuses,
      },
    },
  });
  return totalActivePurchaseOrder;
}

//ringkasan purchase order selesai
export async function getTotalSelesaiPurchaseOrder() {
  const selesaiStatuses = ["Selesai"];
  const totalSelesaiPurchaseOrder = await prisma.purchaseOrder.count({
    where: {
      status_po: {
        in: selesaiStatuses,
      },
    },
  });
  return totalSelesaiPurchaseOrder;
}

//ringkasan jatuh tempo tukar faktur
export async function getTotalSemuaJatuhTempoTukarFaktur() {
  const today = new Date();
  const totalJatuhTempo = await prisma.faktur.count({
    where: {
      tgl_jt: {
        lte: today,
      },
    },
  });
  return totalJatuhTempo;
}

export async function getTotalJatuhTempoTukarFakturHariIni() {
  const today = new Date();
  const totalToday = await prisma.faktur.count({
    where: {
      tgl_jt: today,
    },
  });
  return totalToday;
}

export async function getTotalJatuhTempoTukarFakturBesok() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const totalTomorrow = await prisma.faktur.count({
    where: {
      tgl_jt: tomorrow,
    },
  });

  return totalTomorrow;
}

export async function getTotalJatuhTempoTukarFakturSatuMinggu() {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const totalNextWeek = await prisma.faktur.count({
    where: {
      tgl_jt: {
        gte: today,
        lte: nextWeek,
      },
    },
  });

  return totalNextWeek;
}

//ringkasan jatuh tempo tukar faktur
export async function getTotalSemuaJatuhTempoPenagihan() {
  const today = new Date();
  const totalJatuhTempo = await prisma.faktur.count({
    where: {
      tgl_jt: {
        lte: today,
      },
    },
  });
  return totalJatuhTempo;
}

export async function getTotalJatuhTempoPenagihanHariIni() {
  const today = new Date();
  const totalToday = await prisma.tandaTerimaTagihan.count({
    where: {
      tgl_jt: today,
    },
  });
  return totalToday;
}

export async function getTotalJatuhTempoPenagihanBesok() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const totalTomorrow = await prisma.tandaTerimaTagihan.count({
    where: {
      tgl_jt: tomorrow,
    },
  });

  return totalTomorrow;
}

export async function getTotalJatuhTempoPenagihanSatuMinggu() {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const totalNextWeek = await prisma.tandaTerimaTagihan.count({
    where: {
      tgl_jt: {
        gte: today,
        lte: nextWeek,
      },
    },
  });

  return totalNextWeek;
}

//ringkasan chart
export async function getMonthlyData() {
  // Mengambil data dari database
  const purchaseOrders = await prisma.purchaseOrder.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  const fakturs = await prisma.faktur.findMany({
    // Menggunakan tabel 'faktur'
    orderBy: {
      createdAt: "asc",
    },
  });

  // Mengelompokkan data berdasarkan bulan
  const monthlyData: { [month: string]: any } = {};
  for (const po of purchaseOrders) {
    const date = new Date(po.createdAt);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { purchaseOrder: 0, customer: 0, pendapatan: 0 };
    }
    monthlyData[monthYear].purchaseOrder++;
  }

  for (const customer of customers) {
    const date = new Date(customer.createdAt);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { purchaseOrder: 0, customer: 0, pendapatan: 0 };
    }
    monthlyData[monthYear].customer++;
  }

  for (const faktur of fakturs) {
    // Menggunakan tabel 'faktur'
    const date = new Date(faktur.createdAt);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { purchaseOrder: 0, customer: 0, pendapatan: 0 };
    }
    monthlyData[monthYear].pendapatan += parseFloat(faktur.nilai ?? "0"); // Asumsikan 'nilai' adalah string
  }

  // Format data untuk Recharts
  const formattedData = Object.entries(monthlyData).map(([month, data]) => ({
    month,
    ...data, // Expand data: purchaseOrder, customer, pendapatan
  }));

  return formattedData;
}