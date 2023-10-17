import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { dataSchema } from "@/app/utils/zodTypes";
import { UTApi } from "uploadthing/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    //delete images from UploadThing
    const old = await prisma.products.findFirst({
      where: { title: data.ogTitle },
    });

    const oldimgs = old?.imgs.split("|");
    const newimgs = data.imgs.split("|");

    const innerjoin = oldimgs?.filter((i) => {
      return !newimgs.includes(i);
    }) as string[];

    //delete from database
    const newEntry = await prisma.products.update({
      where: {
        title: data.ogTitle,
      },
      data: {
        ...dataSchema.parse(data),
        tag: data.tag ? data.tag : null,
      },
    });

    const utapi = new UTApi();
    if (innerjoin.length > 0) await utapi.deleteFiles(innerjoin);

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
