"use client";
import Image from "next/image";
import { useState } from "react";
import { dbType } from "../utils";

interface Params {
  p: dbType;
  paths: Array<string>;
}

export default function ImagePreview(params: Params) {
  const [curr, setCurr] = useState(params.paths[0]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        width={500}
        height={500}
        src={require(`../../../tempdb/products/${params.p.name}/${curr}`)}
        alt={`${params.p.name}/${curr}`}
        key={`${params.p.name}/${curr}`}
      />
      <div className="hidden md:block md:flex max-w-[600px]">
        {params.paths.map((n) => {
          return (
            <Image
              width={120}
              height={120}
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
