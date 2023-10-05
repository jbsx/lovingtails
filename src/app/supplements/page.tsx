import { z } from "zod";
import { dataSchema } from "../utils/zodTypes";
import Product from "../components/Product";
import Markdown from "../components/Markdown";

export default async function Supplements() {
  const getProducts = async () => {
    const res = await fetch(process.env.URL + "/api/db/getSupplements", {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) return data.products;
    }
    return [];
  };

  const supplements = (await getProducts()) as z.infer<typeof dataSchema>[];

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center max-w-[1250px]">
        <h1 className="text-4xl text-[var(--accent-clr2)] font-semibold p-[0.5em] pt-[3em] text-left w-full uppercase">
          Supplements
        </h1>
        <div>
          {supplements.map((i, idx) => {
            return (
              <div
                className={`flex gap-[50px] py-[4em] ${
                  idx % 2 === 1 ? "flex-row-reverse" : ""
                } md:flex-col`}
                key={idx}
              >
                <div className="flex flex-col gap-[10px] text-center">
                  <h1 className="text-xl text-[var(--accent-clr1)] font-semibold">
                    {i.title}
                  </h1>
                  <Product data={i} key={i.title} />
                </div>
                <div className="md:p-4">
                  <Markdown data={i.desc}></Markdown>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
