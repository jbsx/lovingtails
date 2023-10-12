import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { adminsSchema } from "../../../utils/zodTypes";
import { z } from "zod";

export async function POST(req: Request) {
  const prisma = new PrismaClient();

  try {
    const reqBody = await req.json();
    const newAdmin = reqBody.data as z.infer<typeof adminsSchema>;
    const data = await prisma.admins.delete({ where: newAdmin });

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false });
  }
}
