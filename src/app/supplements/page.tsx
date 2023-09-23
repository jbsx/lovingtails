import { z } from "zod";
import { dataSchema } from "../utils/zodTypes";
import Product from "../components/Product";

export default async function Supplements() {
  const getProducts = async () => {
    const res = await fetch(`${process.env.URL}/api/db/getCustomProducts`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        where: {
          category: "Supplements",
        },
      }),
    });
    //TODO: pagination

    if (res.ok) {
      const data = await res.json();
      if (data.success) return data.products;
    }
    return [];
  };

  const supplements = (await getProducts()) as z.infer<typeof dataSchema>[];

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center max-w-[1400px]">
        <h1 className="text-3xl text-[var(--accent-clr2)] font-semibold p-[1em]">
          Supplements
        </h1>
        <div className="">
          {supplements.map((i, idx) => {
            return (
              <div
                className={`flex gap-[20px] py-[3em] ${
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
                <div className="whitespace-pre-wrap text-lg">{i.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
