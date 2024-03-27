import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { userId } = auth();

  const userInfo = await prisma.userInfo.findUnique({
    where: {
      clerkId: userId || undefined,
    },
  });
  return NextResponse.json(userInfo);
}
