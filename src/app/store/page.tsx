import Product from "../components/Product";
import { z } from "zod";
import { dataSchema } from "../utils/zodTypes";
import PaginationControl from "../components/PaginationControl";

export default async function Store({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const page = searchParams["page"] ?? "1";
  const per_page = 20;

  const getData = async () => {
    const res = await fetch(
      process.env.URL + `/api/db/getProducts?page=${page}`,
    );

    if (res.ok) {
      const data = await res.json();
      return [data.products as Array<z.infer<typeof dataSchema>>, data.count];
    } else {
      return [];
    }
  };

  let [products, count] = await getData();

  const max_pages = Math.ceil(count / per_page);

  return (
    <div className="flex flex-col justify-center items-center m-5 p-5">
      <div className="container flex flex-wrap justify-center max-w-[2000px] gap-[2px]">
        {products.map((p: z.infer<typeof dataSchema>) => {
          return <Product data={p} key={p.title} />;
        })}
      </div>
      <div className="py-6">
        <PaginationControl max_pages={max_pages} route={"/store"} />
      </div>
    </div>
  );
}
