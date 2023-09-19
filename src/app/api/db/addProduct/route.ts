import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { dataSchema } from "@/app/utils/zodTypes";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  try {
    const data = dataSchema.parse(await req.json());

    const newEntry = await prisma.products.create({
      //add product
      data: {
        title: data.title,
        price: data.price,
        tag: data.tag ? data.tag : null,
        desc: data.desc,
        amznlink: data.amznlink,
        imgs: data.imgs,
      },
    });
    return NextResponse.json({ success: true, data: newEntry });
  } catch (error) {
    console.error("Request error", error);
    if (error instanceof ZodError) {
      let msg = "Invalid Input: ";
      error.issues.forEach((i) => {
        msg += `${i.message} (${i.path.flat()}), `;
      });

      return NextResponse.json({
        message: msg.slice(0, -2),
        success: false,
      });
    }
    return NextResponse.json({
      message: "Server Error: 500",
      success: false,
    });
  }
}
