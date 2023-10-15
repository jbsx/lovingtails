import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { dataSchema } from "@/app/utils/zodTypes";
import prisma from "@/app/utils/db";

export async function POST(req: Request) {
  try {
    const reqBody = dataSchema.parse(await req.json());

    const data = await prisma.products.create({
      data: {
        ...reqBody,
        tag: reqBody.tag ? reqBody.tag : null,
      },
    });
    return NextResponse.json({ success: true, data });
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
