import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const product = await prisma.products.findFirstOrThrow({
      where: {
        title: body.title.trimEnd(),
      },
    });
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
