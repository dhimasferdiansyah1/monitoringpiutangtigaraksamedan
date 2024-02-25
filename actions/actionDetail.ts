import prisma from "@/lib/prisma";

export async function getAllDetail(id: string) {
  const detail = await prisma.purchaseOrder.findUnique({
    where: {
      id: id,
    },
    include: {
      customer: true,
      delivery_note: true,
      faktur: true,
      faktur_pajak: true,
      tandaterimatagihan: true,
      statusserahdokumen: true,
    },
  });
  return detail;
}
