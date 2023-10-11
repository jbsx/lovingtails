import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { adminsSchema } from "../../../utils/zodTypes";

export async function POST(req: Request) {
  const prisma = new PrismaClient();
  const reqBody = adminsSchema.parse(await req.json());
  try {
    const data = await prisma.admins.create({ data: reqBody });
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false });
  }
}
