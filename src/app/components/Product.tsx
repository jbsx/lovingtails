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
        className="relative flex flex-col w-[300px] h-[450px] m-2 p-2 border rounded 4xl cursor-pointer mix-blend-darken text-zinc-700 hover:text-zinc-500 hover:shadow-md transition"
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
          className="overflow-hidden"
        />
        <span className="text-xl font-semibold h-[70px] overflow-hidden">
          {data.name}
        </span>
        {data.tag && (
          <div className="text-md w-fit bg-red-600 text-white bold p-[0.2em] px-[1em] rounded opacity-70">
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
