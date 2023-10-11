import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const admins = await prisma.admins.findMany();

    return NextResponse.json({
      admins,
    });
  } catch {
    return NextResponse.json({ admins: [] });
  }
}
