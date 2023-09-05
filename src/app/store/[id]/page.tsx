import ImagePreview from "@/app/components/ImagePreview";
import db from "../../../../tempdb/db.json";
import fs from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { dbType } from "@/app/utils";
import Image from "next/image";

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
    <div className="mix-blend-darken flex flex-wrap justify-center items-center mt-[2em]">
      <ImagePreview p={p} paths={paths} />
      <div className="flex flex-col m-[4em] max-w-[1000px] sm:m-[1em]">
        <h1 className="text-3xl font-semibold my-[1em]">{p.name}</h1>
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
          <a target="_blank" href={p.links[0]}>
            <div className="flex items-center justify-center w-fit px-[4em] py-[1em] hover:bg-[#221f1f] text-white border-2 border-black">
              <Image
                width={50}
                height={50}
                src={require("../../../../public/amazon.svg")}
                alt="amazon-logo"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
