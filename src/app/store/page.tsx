import Product from "../components/Product";
import { z } from "zod";
import { dataSchema } from "../utils/zodTypes";

export default async function Store() {
  const res = await fetch("/api/db/getProducts", {
    method: "POST",
    body: JSON.stringify({
      skip: 0,
      take: 10,
    }),
  });
  const data = await res.json();
  console.log(data);

  return (
    <div className="flex flex-col justify-center items-center m-5 p-5">
      <div className="container flex flex-wrap justify-center max-w-[2000px] gap-[2px]">
        {data.products.map((product: z.infer<typeof dataSchema>) => {
          return <Product data={product} key={product.title} />;
        })}
      </div>
    </div>
  );
}
