import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const newEntry = await prisma.products.delete({
      where: {
        title: data.title,
      },
    });
    return NextResponse.json({ success: true, data: newEntry });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({
      message: "Server Error: 500",
      success: false,
    });
  }
}
