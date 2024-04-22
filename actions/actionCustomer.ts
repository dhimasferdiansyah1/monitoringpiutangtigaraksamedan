"use server";
import prisma from "@/lib/prisma";
import { uuidModified } from "@/lib/utils";
import { tambahCustomerSchema } from "@/types/customer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ITEM_PER_PAGE = 20;

export async function getCustomerList(currentPage: number, query: string) {
  const offset = (currentPage - 1) * ITEM_PER_PAGE;

  const customer = await prisma.customer.findMany({
    skip: offset,
    take: ITEM_PER_PAGE,
    where: {
      OR: [
        {
          customer_name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          account: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      id: "asc",
    },
    include: {
      purchase_order: {
        select: {
          _count: true,
        },
      },
    },
  });
  return customer;
}

export async function getCustomerListPages(query: string) {
  const response = await prisma.customer.count({
    where: {
      OR: [
        {
          customer_name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          account: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      id: "asc",
    },
  });
  const totalPages = Math.ceil(Number(response) / ITEM_PER_PAGE);
  return totalPages;
}

export async function deleteCustomerList(id: string) {
  try {
    await prisma.customer.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard/customer");
  } catch (error) {}
}

export async function createCustomerList(formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const { customer_name, account, alamat, no_telp, email } =
    tambahCustomerSchema.parse(values);

  const kodeAccountCustomer = account;
  const kodeAccountCustomerWithoutExt = kodeAccountCustomer;
  const idFormat = uuidModified() + "-" + kodeAccountCustomerWithoutExt;

  try {
    await prisma.customer.create({
      data: {
        id: idFormat,
        customer_name,
        account,
        alamat,
        no_telp,
        email,
      },
    });
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/dashboard/customer");
  redirect("/dashboard/customer");
}

export async function getCustomerUniqe(id: string) {
  const customer = await prisma.customer.findUnique({
    where: {
      id: id,
    },
  });
  return customer;
}

export async function updateCustomerList(id: string, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  try {
    await prisma.customer.update({
      where: {
        id,
      },
      data: {
        ...values,
      },
    });
    // Return a success message and the updated customer object
  } catch (error) {
    // Return a failure message and the error object
    console.error(error);
  }
  revalidatePath("/dashboard/customer");
  redirect("/dashboard/customer"); // Navigate to the new post page
}
