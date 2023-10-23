import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.products.findMany({
      where: {
        category: "Supplements",
      },
      orderBy: {
        priority: "desc",
      },
    });
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}
