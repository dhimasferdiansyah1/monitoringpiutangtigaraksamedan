"use server";

import prisma from "@/lib/prisma";

export async function getCustomers() {
  const customers = await prisma.customer.findMany();
  return {
    props: {
      customers,
    },
  };
}
