import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { adminsSchema } from "../../../utils/zodTypes";
import { z } from "zod";

export async function POST(req: Request) {
  const prisma = new PrismaClient();
  const reqBody = await req.json();
  const adminArr = reqBody.data as z.infer<typeof adminsSchema>[];

  try {
    const promises = adminArr.map((i) => {
      return prisma.admins.delete({ where: i });
    });

    const data = prisma.$transaction(promises);

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false });
  }
}
