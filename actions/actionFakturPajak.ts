"use server";

import prisma from "@/lib/prisma";

export async function getFakturPajakUniqe(id: string) {
  const fakturPajak = await prisma.fakturPajak.findUnique({
    where: {
      id: id,
    },
  });
  return fakturPajak;
}
