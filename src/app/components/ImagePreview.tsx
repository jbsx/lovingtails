"use client";
import Image from "next/image";
import { useState } from "react";

interface Product {
  name: string;
  price: number;
  tag?: string;
}

interface Params {
  p: Product;
  paths: Array<string>;
}

export default function ImagePreview(params: Params) {
  const [curr, setCurr] = useState(params.paths[0]);

  return (
    <div className="flex lg:flex-col flex-wrap justify-center items-center">
      <Image
        width={600}
        height={600}
        src={require(`../../../tempdb/products/${params.p.name}/${curr}`)}
        alt={curr}
      />
      <div className="flex max-w-[600px] overflow-x-scroll">
        {params.paths.map((n) => {
          return (
            <Image
              width={100}
              height={100}
              src={require(`../../../tempdb/products/${params.p.name}/${n}`)}
              alt={`${params.p.name}/${n}`}
              key={`${params.p.name}/${n}`}
              onMouseEnter={() => {
                setCurr(n);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
