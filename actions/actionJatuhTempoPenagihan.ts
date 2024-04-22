import prisma from "@/lib/prisma";

const ITEM_PER_PAGE = 6;

export async function getJatuhTempo(currentPage: number, query: string) {
  const offset = (currentPage - 1) * ITEM_PER_PAGE;
  //filter date_jt is the same as today or has already passed
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate filtering

  const jatuhTempo = await prisma.purchaseOrder.findMany({
    skip: offset,
    take: ITEM_PER_PAGE,
    where: {
      tandaterimatagihan: {
        tgl_jt: {
          //filter date_jt is the same as today or has already passed
          lte: today,
        },
      },
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
        {
          tandaterimatagihan: {
            tgl_jt: {
              //filter date_jt is the same as today or has already passed
              lte: today,
            },
            no_penagihan: {
              contains: query,
              mode: "insensitive",
            },
          },
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

export async function getJatuhTempoPages(query: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time for consistency

  const response = await prisma.purchaseOrder.count({
    where: {
      tandaterimatagihan: {
        NOT: {
          // Exclude purchaseOrders without a tandaterimatagihan
          no_penagihan: null,
        },
        tgl_jt: {
          lte: today, // Filter for due dates on or before today
        },
      },
      OR: [
        {
          no_po: {
            contains: query,
            mode: "insensitive",
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
        {
          delivery_note: {
            no_dn: {
              contains: query,
              mode: "insensitive",
            },
          },
        },

        {
          tandaterimatagihan: null, // Include purchaseOrders without a faktur (optional)
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

export async function getJatuhTempoBesok(currentPage: number, query: string) {
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
      tandaterimatagihan: {
        NOT: {
          no_penagihan: null, // Exclude purchaseOrders without a faktur
        },
        tgl_jt: {
          gt: today, // Filter for due dates after today
          lte: tomorrow, // Filter for due dates on or before tomorrow
        },
      },

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

export async function getJatuhTempoBesokPages(query: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for accurate filtering

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Set time to 00:00:00 for tomorrow

  const response = await prisma.purchaseOrder.count({
    where: {
      tandaterimatagihan: {
        NOT: {
          no_penagihan: null, // Exclude purchaseOrders without a faktur
        },
        tgl_jt: {
          gt: today, // Filter for due dates after today
          lte: tomorrow, // Filter for due dates on or before tomorrow
        },
      },

      OR: [
        {
          no_po: {
            contains: query,
            mode: "insensitive",
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
        {
          delivery_note: {
            no_dn: {
              contains: query,
              mode: "insensitive",
            },
          },
        },

        {
          tandaterimatagihan: null, // Include purchaseOrders without a faktur (optional)
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

// jatuh tempo seminggu

export async function getJatuhTempoSatuMinggu(
  currentPage: number,
  query: string
) {
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
      tandaterimatagihan: {
        NOT: {
          no_penagihan: null, // Exclude purchaseOrders without a faktur
        },
        tgl_jt: {
          gt: today, // Filter for due dates after today
          lte: oneWeekFromToday, // Filter for due dates on or before one week from today
        },
      },
      no_po: {
        contains: query,
        mode: "insensitive",
      },

      OR: [
        {
          faktur: {
            no_fk: {
              contains: query,
              mode: "insensitive",
            },
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
          tandaterimatagihan: null, // Include purchaseOrders without a faktur (optional)
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

export async function getJatuhTempoSatuMingguPages(query: string) {
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
      tandaterimatagihan: {
        NOT: {
          no_penagihan: null, // Exclude purchaseOrders without a faktur
        },
        tgl_jt: {
          gt: today, // Filter for due dates after today
          lte: oneWeekFromToday, // Filter for due dates on or before one week from today
        },
      },

      OR: [
        {
          no_po: {
            contains: query,
            mode: "insensitive",
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
        {
          delivery_note: {
            no_dn: {
              contains: query,
              mode: "insensitive",
            },
          },
        },

        {
          tandaterimatagihan: null, // Include purchaseOrders without a faktur (optional)
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

//jatuh tempo semua

export async function getJatuhTempoSemua(currentPage: number, query: string) {
  const offset = (currentPage - 1) * ITEM_PER_PAGE;

  const jatuhTempoSemua = await prisma.purchaseOrder.findMany({
    skip: offset,
    take: ITEM_PER_PAGE,
    where: {
      tandaterimatagihan: {
        tgl_jt: {
          not: null,
        },
      },
      OR: [
        {
          no_po: {
            contains: query,
            mode: "insensitive",
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

export async function getJatuhTempoSemuaPages(query: string) {
  const response = await prisma.purchaseOrder.count({
    where: {
      tandaterimatagihan: {
        tgl_jt: {
          not: null,
        },
      },
      OR: [
        {
          no_po: {
            contains: query,
            mode: "insensitive",
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
        {
          delivery_note: {
            no_dn: {
              contains: query,
              mode: "insensitive",
            },
          },
        },

        {
          tandaterimatagihan: null, // Include purchaseOrders without a faktur (optional)
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
