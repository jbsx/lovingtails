import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
  try {
    const res = await prisma.products.findMany({
      where: {
        feature: true,
      },
      orderBy: {
        priority: "desc",
      },
    });
    return NextResponse.json({ success: true, products: res });
  } catch (e) {
    return NextResponse.json({ success: false });
  }
}
