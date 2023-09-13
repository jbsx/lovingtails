import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const newEntry = await prisma.product.create({
      //add product
      data: {},
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating question", success: false });
  }
  return NextResponse.json({ message: "CULSKDFJLSKFJD" });
}
