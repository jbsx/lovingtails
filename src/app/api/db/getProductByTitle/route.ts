import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const title = decodeURI(searchParams.get("title") ?? "");

    const product = await prisma.products.findUnique({
      where: {
        title,
      },
    });
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ status: 500, statusText: error.message });
    } else {
      return NextResponse.json({
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  }
}
