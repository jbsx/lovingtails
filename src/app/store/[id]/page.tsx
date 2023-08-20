import Image from "next/image";
import ImagePreview from "@/app/components/ImagePreview";
import db from "../../../../tempdb/db.json";
import fs from "fs";

interface ParamsType {
  params: { id: string };
}

interface Product {
  name: string;
  price: number;
  tag?: string;
}

async function loadimages(p: Product) {
  return fs.readdirSync(`./tempdb/products/${p.name}/`);
}

export default async function ProductPage({ params }: ParamsType) {
  const products = db.Products.filter((p) => {
    return p.name == params.id.split("%20").join(" ");
  });
  if (products.length == 0) {
    // TODO: redirect to 404
  }
  const p: Product = products[0];
  const paths = await loadimages(p);

  return (
    <div className="mix-blend-darken flex justify-center items-center">
      <ImagePreview p={p} paths={paths} />
      <div className="mx-[10em]"></div>
      <div className="flex flex-col m-[4em]">
        <span className="text-xl font-semibold">{p.name}</span>
        {p.tag && (
          <div className="text-md w-fit bg-red-600 text-white bold p-[0.2em] px-[1em] rounded opacity-70">
            {p.tag}
          </div>
        )}
        <span className="text-3xl">INR {p.price}</span>
      </div>
    </div>
  );
}
