import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.products.findMany({
      where: {
        category: "Supplements",
      },
    });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
