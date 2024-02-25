"use server";

import prisma from "@/lib/prisma";

export async function getTandaTerimaTagihanUniqe(id: string) {
  const tandaTerimaTagihan = await prisma.tandaTerimaTagihan.findUnique({
    where: {
      id: id,
    },
  });
  return tandaTerimaTagihan;
}
