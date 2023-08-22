import ImagePreview from "@/app/components/ImagePreview";
import db from "../../../../tempdb/db.json";
import fs from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { dbType } from "@/app/utils";

interface ParamsType {
  params: { id: string };
}

export default function ProductPage({ params }: ParamsType) {
  const products = db.Products.filter((p) => {
    return p.name == params.id.split("%20").join(" ");
  });
  if (products.length == 0) {
    redirect("/404");
  }
  const p: dbType = products[0];
  const paths = fs.readdirSync(
    path.join(process.cwd(), "tempdb", "products", p.name),
  );

  return (
    <div className="mix-blend-darken flex flex-wrap justify-center items-center">
      <ImagePreview p={p} paths={paths} />
      <div className="flex flex-col m-[4em]">
        <span className="text-xl font-semibold">{p.name}</span>
        {p.tag && (
          <div className="text-md w-fit bg-red-600 text-white bold p-[0.2em] px-[1em] rounded opacity-70">
            {p.tag}
          </div>
        )}
        <span className="text-3xl">
          {p.price == -1 ? "Out of stock" : `INR ${p.price}`}
        </span>
      </div>
    </div>
  );
}
