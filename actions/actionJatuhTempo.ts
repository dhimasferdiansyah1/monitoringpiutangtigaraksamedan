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


//getJatuhTempo Besok

export async function getJatuhTempoBesok(currentPage: number) {
  const offset = (currentPage - 1) * ITEM_PER_PAGE;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate filtering

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Set time to 00:00:00 for tomorrow

  const jatuhTempoBesok = await prisma.purchaseOrder.findMany({
    skip: offset,
    take: ITEM_PER_PAGE,
    where: {
      OR: [
        {
          faktur: {
            NOT: {
              no_fk: null, // Exclude purchaseOrders without a faktur
            },
            tgl_jt: {
              gt: today,  // Filter for due dates after today
              lte: tomorrow, // Filter for due dates on or before tomorrow
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

  return jatuhTempoBesok;
}


export async function getJatuhTempoBesokPages(currentPage: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate filtering

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Set time to 00:00:00 for tomorrow

  const response = await prisma.purchaseOrder.count({
    where: {
      OR: [
        {
          faktur: {
            NOT: {
              no_fk: null, // Exclude purchaseOrders without a faktur
            },
            tgl_jt: {
              gt: today, // Filter for due dates after today
              lte: tomorrow, // Filter for due dates on or before tomorrow
            },
          },
        },
        {
          faktur: null, // Include purchaseOrders without a faktur (optional)
        },
      ],
    },
  });

  const totalPages = Math.ceil(Number(response) / ITEM_PER_PAGE);
  return totalPages;
}


// jatuh tempo seminggu

export async function getJatuhTempoSatuMinggu(currentPage: number) {
  const offset = (currentPage - 1) * ITEM_PER_PAGE;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate filtering

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Set time to 00:00:00 for tomorrow

  const oneWeekFromToday = new Date(today);
  oneWeekFromToday.setDate(today.getDate() + 7);
  oneWeekFromToday.setHours(0, 0, 0, 0); // Set time to 00:00:00 for one week from today

  const jatuhTempoSatuMinggu = await prisma.purchaseOrder.findMany({
    skip: offset,
    take: ITEM_PER_PAGE,
    where: {
      OR: [
        {
          faktur: {
            NOT: {
              no_fk: null, // Exclude purchaseOrders without a faktur
            },
            tgl_jt: {
              gt: today, // Filter for due dates after today
              lte: oneWeekFromToday, // Filter for due dates on or before one week from today
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

  return jatuhTempoSatuMinggu;
}


export async function getJatuhTempoSatuMingguPages(currentPage: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate filtering

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Set time to 00:00:00 for tomorrow

  const oneWeekFromToday = new Date(today);
  oneWeekFromToday.setDate(today.getDate() + 7);
  oneWeekFromToday.setHours(0, 0, 0, 0); // Set time to 00:00:00 for one week from today

  const response = await prisma.purchaseOrder.count({
    where: {
      OR: [
        {
          faktur: {
            NOT: {
              no_fk: null, // Exclude purchaseOrders without a faktur
            },
            tgl_jt: {
              gt: today, // Filter for due dates after today
              lte: oneWeekFromToday, // Filter for due dates on or before one week from today
            },
          },
        },
        {
          faktur: null, // Include purchaseOrders without a faktur (optional)
        },
      ],
    },
  });

  const totalPages = Math.ceil(Number(response) / ITEM_PER_PAGE);
  return totalPages;
}

//jatuh tempo semua

export async function getJatuhTempoSemua(currentPage: number) {
  const offset = (currentPage - 1) * ITEM_PER_PAGE;

  const jatuhTempoSemua = await prisma.purchaseOrder.findMany({
    skip: offset,
    take: ITEM_PER_PAGE,
    where: {
      faktur: {
        tgl_jt: {
          not: null,
        },
      },
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

  return jatuhTempoSemua;
}

export async function getJatuhTempoSemuaPages(currentPage: number) {
  const response = await prisma.purchaseOrder.count({
    where: {
      faktur: {
        tgl_jt: {
         not: null,
        },
      },
    },
  });

  const totalPages = Math.ceil(Number(response) / ITEM_PER_PAGE);
  return totalPages;
}


