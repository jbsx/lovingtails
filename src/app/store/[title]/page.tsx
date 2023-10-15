import ImagePreview from "@/app/components/ImagePreview";
import Markdown from "@/app/components/Markdown";
import { redirect } from "next/navigation";
import { z } from "zod";
import { dataSchema } from "@/app/utils/zodTypes";
import amznlogo from "../../../../public/amazon.svg";
import Image from "next/image";
import prisma from "@/app/utils/db";

//ISR - revalidate 24 hours
export const revalidate = 1440;

//Server site generation
export async function generateStaticParams() {
  const res = await prisma.products.findMany({
    orderBy: {
      priority: "desc",
    },
  });

  return res.map((i: any) => {
    ({
      title: i.title.replaceAll(" ", "%20"),
    });
  });
}

interface ParamsType {
  params: { title: string };
}

export default async function ProductPage({ params }: ParamsType) {
  const title = params.title.replaceAll("%20", " ");

  const res = await (
    await fetch(process.env.URL + "/api/db/getProductByTitle", {
      method: "POST",
      body: JSON.stringify({ title }),
    })
  ).json();

  if (!res.success) {
    redirect("/404");
  }

  const p: z.infer<typeof dataSchema> = res.product;

  return (
    <div className="mix-blend-multiply flex flex-wrap justify-center mt-[2em]">
      <ImagePreview p={p.imgs} />
      <div className="flex flex-col m-[4em] max-w-[1000px] sm:m-[1em]">
        <h1 className="text-3xl font-semibold py-[0.5em]">{p.title}</h1>

        {p.tag && (
          <h3 className="text-md w-fit bg-[var(--accent-clr2)] text-white bold p-[0.5em] px-[1em]">
            {p.tag}
          </h3>
        )}

        <h2 className="text-3xl text-[var(--accent-clr1)] font-semibold py-[0.5em]">
          {p.price == -1 ? "Out of stock" : `₹ ${p.price}`}
        </h2>

        <div className="py-[1em]">
          <a target="_blank" href={p.amznlink}>
            <div className="flex items-center justify-center w-fit px-[4em] py-[1em] hover:bg-[#221f1f] text-white border-2 border-black">
              <Image width={50} height={50} src={amznlogo} alt="amazon-logo" />
            </div>
          </a>
        </div>

        <Markdown data={p.desc}></Markdown>
      </div>
    </div>
  );
}
