import { NextResponse } from "next/server";
import { adminsSchema } from "../../../utils/zodTypes";
import prisma from "@/app/utils/db";

export async function POST(req: Request) {
  const reqBody = adminsSchema.parse(await req.json());
  try {
    const data = await prisma.admins.create({ data: reqBody });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
