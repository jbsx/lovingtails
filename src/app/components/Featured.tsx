import Product from "./Product";
import { z } from "zod";
import { dataSchema } from "../utils/zodTypes";

export default async function Featured() {
  const getProducts = async () => {
    const res = await fetch(process.env.URL + "/api/db/getProductsFeatured", {
      method: "POST",
      mode: "same-origin",
      credentials: "same-origin",
      next: {
        revalidate: 3600,
      },
    });

    if (res && res.ok) {
      const data = await res.json();
      if (data.success) return data.products;
    } else {
      return [];
    }
  };

  const products = (await getProducts()) as z.infer<typeof dataSchema>[];

  return (
    <div className="flex flex-wrap lg:flex-col w-full justify-center items-center py-[5em] gap-[2px]">
      {products.map((p: z.infer<typeof dataSchema>) => {
        return <Product data={p} key={p.title} />;
      })}
    </div>
  );
}
