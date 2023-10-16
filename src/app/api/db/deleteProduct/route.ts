import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const utapi = new UTApi();
    const old = await prisma.products.findFirst({
      where: { title: data.title },
    });

    const newEntry = await prisma.products.delete({
      where: {
        title: data.title,
      },
    });

    await utapi.deleteFiles(old?.imgs.split("|") as string[]);

    return NextResponse.json({ success: true, data: newEntry });
  } catch (error) {
    console.error("Request error", error);

    return NextResponse.json({
      message: "Server Error: 500",
      success: false,
    });
  }
}
