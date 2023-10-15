import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const admins = await prisma.admins.findMany();

    return NextResponse.json({
      admins,
    });
  } catch {
    return NextResponse.json({ admins: [] });
  }
}
