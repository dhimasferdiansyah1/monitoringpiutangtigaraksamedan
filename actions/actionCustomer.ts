"use server";
import prisma from "@/lib/prisma";
import { uuidModified } from "@/lib/utils";
import { tambahCustomerSchema } from "@/types/customer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getCustomerList() {
  try {
    const customer = await prisma.customer.findMany({
      where: {
        id: {
          not: undefined,
        },
      },
      orderBy: {
        id: "asc",
      },
    });
    return customer;
  } catch (error) {
    console.error(error);
  }
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
