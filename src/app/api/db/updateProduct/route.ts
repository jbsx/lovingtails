import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { dataSchema } from "@/app/utils/zodTypes";
import { UTApi } from "uploadthing/server";
import { revalidatePath } from "next/cache";

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

    revalidatePath("/store");

    return NextResponse.json({ data: newEntry }, { status: 200 });
  } catch (error) {
    console.error("Request error", error);

    if (error instanceof ZodError) {
      let msg = "Invalid Input: ";
      error.issues.forEach((i) => {
        msg += `${i.message} (${i.path.flat()}), `;
      });

      return NextResponse.json(
        {
          error: msg.slice(0, -2),
        },
        { status: 500, statusText: "Input validation Error" },
      );
    }
    return NextResponse.json(
      {
        error: JSON.stringify(error),
      },
      { status: 500, statusText: "Internal Sever Error" },
    );
  }
}
