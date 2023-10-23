import { ZodError } from "zod";
import { dataSchema } from "@/app/utils/zodTypes";
import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const reqBody = dataSchema.parse(await req.json());

    const data = await prisma.products.create({
      data: {
        ...reqBody,
        tag: reqBody.tag ? reqBody.tag : null,
      },
    });

    revalidatePath("/store");

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      let msg = "Invalid Input: ";
      error.issues.forEach((i) => {
        msg += `${i.message} (${i.path.flat()}), `;
      });

      return NextResponse.json(
        {
          error: new Error(msg.slice(0, -2)),
        },
        { status: 400, statusText: "Input Validation Error" },
      );
    } else if (error instanceof Error) {
      return NextResponse.json(
        {
          error,
        },
        { status: 500, statusText: error.message },
      );
    } else {
      return NextResponse.json(
        {
          error,
        },
        { status: 500, statusText: "Internal Server Error" },
      );
    }
  }
}
