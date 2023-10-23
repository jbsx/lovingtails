import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const utapi = new UTApi();
    const deleted = await prisma.products.delete({
      where: {
        title: data.title,
      },
    });

    await utapi.deleteFiles(deleted?.imgs.split("|") as string[]);

    return NextResponse.json(
      { data: deleted },
      { status: 200, statusText: "Deleted Successfully" },
    );
  } catch (error) {
    console.error("Request error", error);

    return NextResponse.json(
      {
        error,
      },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}
