import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1");

    const [products, count] = await Promise.all([
      prisma.products.findMany({
        skip: (page - 1) * 20,
        take: 20,
        orderBy: {
          priority: "desc",
        },
      }),
      prisma.products.count(),
    ]);

    return NextResponse.json({ products, count }, { status: 200 });
  } catch (error) {
    console.error("Error in getProducts: ", error);

    return NextResponse.json(
      { error },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}
