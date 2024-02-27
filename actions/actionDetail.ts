import prisma from "@/lib/prisma";

export async function getAllDetail(Id: string) {
  const detail = await prisma.purchaseOrder.findUnique({
    where: {
      id: Id,
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
