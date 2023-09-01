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
        className="relative flex flex-col justify-center items-center w-[400px] h-[550px] m-[1px] p-[1em]
                   hover:border hover:border-[var(--accent-clr1)] cursor-pointer text-zinc-700 bg-[rgba(0,0,0,0.03)]
                hover:bg-[var(--backgound-hex)] hover:text-[var(--accent-clr1)] sm:w-screen sm:h-fit sm:pb-[50px]"
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
          className="overflow-hidden mix-blend-darken max-h-[300px]"
        />

        <h1 className="text-xl font-medium my-[1em] overflow-hidden">
          {data.name}
        </h1>

        <span className="text-3xl font-semibold">
          {data.price == -1 ? "Out of stock" : `₹ ${data.price}`}
        </span>

        {data.tag && (
          <div
            className={`absolute bottom-0 left-0 text-md w-full ${
              hover ? "bg-[var(--accent-clr1)]" : "bg-[var(--accent-clr2)]"
            } text-white font-medium p-[0.2em] px-[1em]`}
          >
            {data.tag}
          </div>
        )}
      </div>
    </Link>
  );
}
