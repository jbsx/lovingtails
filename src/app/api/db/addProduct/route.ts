import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    const newEntry = await prisma.product.create({
      //add product
      data: {
        id: `${Math.random()}`,
        name: data.name,
        price: parseFloat(data.price),
        tag: data.tag,
        desc: data.desc,
        link: data.link,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({
      error: "Error creating question",
      success: false,
    });
  }
}
