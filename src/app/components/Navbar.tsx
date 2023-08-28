"use client";

import Logo from "../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Mulish } from "next/font/google";
import { Menu, Cross } from "../imports";
import { useState } from "react";

const mulish = Mulish({ subsets: ["latin"] });

export default function Navbar() {
  const [hmenu, setHmenu] = useState(true);

  return (
    <div className="flex justify-around items-center p-4 text-center text-[var(--accent-clr2)] font-bold text-xl px-4">
      <Link href={"/"}>
        <div className="flex items-center">
          <Image
            width={100}
            height={100}
            src={Logo.src}
            alt="Logo"
            className="w-[80px]"
          />
          <h1
            className={`text-5xl m-[1em] text-[var(--main-clr)] hidden sm:block ${mulish.className}`}
          >
            LovingTails
          </h1>
        </div>
      </Link>
      <div className="hidden lg:block text-2xl font-medium uppercase">
        <Link className="p-3 m-2 w-[100]" href={"/store"}>
          Store
        </Link>
        <Link className="p-3 m-2 w-[100]" href={"/contact"}>
          Contact
        </Link>
      </div>
      <div className="lg:hidden transitions-all">
        {hmenu ? (
          <Menu
            isVisible={hmenu}
            onClick={() => {
              setHmenu(!hmenu);
            }}
          />
        ) : (
          <Cross
            isVisible={!hmenu}
            onClick={() => {
              setHmenu(!hmenu);
            }}
          />
        )}
      </div>
      {!hmenu && (
        <div className="absolute top-[152px] left-0 w-screen h-screen backdrop-blur pt-[100px] flex flex-col text-4xl">
          <Link
            className="p-3 m-2 w-[100]"
            href={"/store"}
            onClick={() => {
              setHmenu(!hmenu);
            }}
          >
            Store
          </Link>
          <Link
            className="p-3 m-2 w-[100]"
            href={"/contact"}
            onClick={() => {
              setHmenu(!hmenu);
            }}
          >
            Contact
          </Link>
        </div>
      )}
    </div>
  );
}
