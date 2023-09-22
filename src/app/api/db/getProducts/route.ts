import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const products = await prisma.products.findMany({
      skip: body.skip,
      take: body.take,
    });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Request error", error);
  }
  return NextResponse.json({ success: false });
}
