import ImagePreview from "@/app/components/ImagePreview";
import Markdown from "@/app/components/Markdown";
import { redirect } from "next/navigation";
import { z } from "zod";
import { dataSchema } from "@/app/utils/zodTypes";
import { FaAmazon } from "react-icons/fa";
import prisma from "@/app/utils/db";

//Server site generation
export async function generateStaticParams() {
  const res = await prisma.products.findMany({
    orderBy: {
      priority: "desc",
    },
  });

  return res.map((i: any) => {
    ({
      title: decodeURI(i.title),
    });
  });
}

interface ParamsType {
  params: { title: string };
}

export default async function ProductPage({ params }: ParamsType) {
  const res = await fetch(
    process.env.URL + `/api/db/getProductByTitle?title=${params.title}`,
  );

  const data = await res.json();

  if (!res.ok) {
    console.log(data.error);
    return <div>Something went wrong. Please try again later.</div>;
  }

  const p: z.infer<typeof dataSchema> = data.product;

  return (
    <div className="mix-blend-multiply flex flex-wrap justify-center mt-[4em]">
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
            <div className="flex items-center justify-center w-fit px-[4em] py-[1em] hover:bg-[#221f1f] group border-2 border-black">
              <FaAmazon className="text-[var(--accent-clr2)] group-hover:text-white text-3xl" />
            </div>
          </a>
        </div>

        <Markdown data={p.desc}></Markdown>
      </div>
    </div>
  );
}
