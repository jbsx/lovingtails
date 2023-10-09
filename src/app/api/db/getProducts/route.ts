import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const body = await req.json();
  try {
    const [products, count] = await prisma.$transaction([
      prisma.products.findMany({
        skip: body.skip,
        take: body.take,
        orderBy: {
          priority: "desc",
        },
      }),
      prisma.products.count(),
    ]);

    return NextResponse.json({ success: true, products, count });
  } catch (error) {
    console.error("Request error", error);
  }
  return NextResponse.json({ success: false });
}
