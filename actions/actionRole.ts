"use server";
import prisma from "@/lib/prisma";
import { tambahRoleUserSchema } from "@/types/pilihrole";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function selectRole(formData: FormData) {
  const { userId } = auth();

  const values = Object.fromEntries(formData.entries());
  //   const { role } = tambahRoleUserSchema.parse(values);

  try {
    await prisma.userInfo.update({
      where: {
        clerkId: userId || undefined,
      },
      data: {
        ...values,
      },
    });
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/");
  redirect("/dashboard");
}

export async function getUser() {
  const { userId } = auth();
  const userInfo = await prisma.userInfo.findUnique({
    where: {
      clerkId: userId || undefined,
    },
  });
  return userInfo;
}
