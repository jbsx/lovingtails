import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST() {
  try {
    const products = await prisma.products.findMany({
      where: {
        category: "Supplements",
      },
      orderBy: {
        priority: "desc",
      },
    });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
