import { NextResponse } from "next/server";
import { utapi } from "uploadthing/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.formData();

    //TODO:validate files

    let bruh: File[] = [];
    body.forEach(async (i) => {
      bruh = [...bruh, i as File];
    });

    await utapi.uploadFiles(bruh);

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false });
  }
}
