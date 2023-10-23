import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const admins = await prisma.admins.findMany();

    return NextResponse.json(
      {
        admins,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error },
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
