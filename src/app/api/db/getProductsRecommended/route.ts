import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const res = await prisma.products.findMany({
      where: {
        recommend: true,
      },
    });
    return NextResponse.json({ success: true, products: res });
  } catch (e) {
    return NextResponse.json({ success: false });
  }
}
