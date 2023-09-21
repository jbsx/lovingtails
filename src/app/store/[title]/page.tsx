import ImagePreview from "@/app/components/ImagePreview";
import { redirect } from "next/navigation";
import { z } from "zod";
import { dataSchema } from "@/app/utils/zodTypes";
import amznlogo from "../../../../public/amazon.svg";
import Image from "next/image";

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
    <div className="mix-blend-darken flex flex-wrap justify-center items-center mt-[2em]">
      <ImagePreview p={p.imgs} />
      <div className="flex flex-col m-[4em] max-w-[1000px] sm:m-[1em]">
        <h1 className="text-3xl font-semibold my-[1em]">{p.title}</h1>
        {p.tag && (
          <h3 className="text-md w-fit bg-[var(--accent-clr2)] text-white bold p-[0.2em] px-[1em]">
            {p.tag}
          </h3>
        )}
        <p className="text-xl break-normal">{p.desc}</p>
        <h2 className="text-3xl text-[var(--accent-clr1)] font-semibold my-[1em]">
          {p.price == -1 ? "Out of stock" : `₹ ${p.price}`}
        </h2>

        <div>
          <a target="_blank" href={p.amznlink}>
            <div className="flex items-center justify-center w-fit px-[4em] py-[1em] hover:bg-[#221f1f] text-white border-2 border-black">
              <Image width={50} height={50} src={amznlogo} alt="amazon-logo" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
