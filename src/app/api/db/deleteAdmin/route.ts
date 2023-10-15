import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import { adminsSchema } from "../../../utils/zodTypes";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const newAdmin = reqBody.data as z.infer<typeof adminsSchema>;
    const data = await prisma.admins.delete({ where: newAdmin });

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false });
  }
}
