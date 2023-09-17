import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
  try {
    const products = await prisma.products.findMany();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Request error", error);
  }
  return NextResponse.json({ success: false });
}
