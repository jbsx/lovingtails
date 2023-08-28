"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { dbType } from "../utils";

interface Props {
  data: dbType;
}

export default function Product({ data }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <Link href={`/store/${data.name}`}>
      <div
        className="relative flex flex-col w-[300px] h-[450px] m-2 p-2 border rounded-3xl 4xl cursor-pointer text-zinc-700 hover:bg-[rgba(0,0,0,0.03)] hover:text-[var(--main-clr)] overflow-hidden"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <Image
          width={300}
          height={300}
          src={require(`../../../tempdb/products/${data.name}/${
            hover ? "2" : "1"
          }.jpg`)}
          alt={data.name}
          className="overflow-hidden mix-blend-darken"
        />

        <h1 className="text-2xl font-medium h-[70px] overflow-hidden">
          {data.name}
        </h1>

        {data.tag && (
          <div className="absolute bottom-0 left-0 text-md w-full bg-[var(--accent-clr2)] text-white font-medium p-[0.2em] px-[1em]">
            {data.tag}
          </div>
        )}

        <span className="text-3xl">
          {data.price == -1 ? "Out of stock" : `INR ${data.price}`}
        </span>
      </div>
    </Link>
  );
}
