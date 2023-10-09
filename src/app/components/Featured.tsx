import Product from "./Product";
import { z } from "zod";
import { dataSchema } from "../utils/zodTypes";

export default async function Featured() {
  const getFeaturedProducts = async () => {
    let res = undefined;
    try {
      res = await fetch(process.env.URL + "/api/db/getProductsFeatured", {
        cache: "no-store",
      });
    } catch (e) {
      console.log(e);
    }
    if (res && res.ok) {
      const data = await res.json();
      if (data.success) return data.products;
    } else {
      return [];
    }
  };

  const products = (await getFeaturedProducts()) as Array<
    z.infer<typeof dataSchema>
  >;

  return (
    <div className="flex flex-wrap lg:flex-col w-full justify-center items-center py-[5em] gap-[2px]">
      {products.map((p: z.infer<typeof dataSchema>) => {
        return <Product data={p} key={p.title} />;
      })}
    </div>
  );
}
