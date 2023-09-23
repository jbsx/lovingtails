import Product from "../components/Product";
import { z } from "zod";
import { dataSchema } from "../utils/zodTypes";

export default async function Store() {
  const getProducts = async () => {
    const res = await fetch(process.env.URL + "/api/db/getProducts", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        skip: 0,
        take: 10,
      }),
    });
    //TODO: Pagination
    if (res.ok) {
      const data = await res.json();
      if (data.success) return data.products;
    }
    return [];
  };

  const products = (await getProducts()) as Array<z.infer<typeof dataSchema>>;

  return (
    <div className="flex flex-col justify-center items-center m-5 p-5">
      <div className="container flex flex-wrap justify-center max-w-[2000px] gap-[2px]">
        {products.map((p) => {
          return <Product data={p} key={p.title} />;
        })}
      </div>
    </div>
  );
}
