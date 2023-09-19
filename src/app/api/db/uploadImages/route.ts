import { NextResponse } from "next/server";
import { utapi } from "uploadthing/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.formData();

    //validate files

    let bruh: File[] = [];
    body.forEach(async (i) => {
      bruh = [...bruh, i as File];
    });

    console.log(await utapi.uploadFiles(bruh));

    //upload
    //const response = await utapi.uploadFiles(body);
    //console.log(response);

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false });
  }
}
