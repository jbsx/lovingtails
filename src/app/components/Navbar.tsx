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
    <div className="flex justify-around items-center p-4 text-center text-[var(--accent-clr1)] font-bold text-xl px-4 w-screen">
      <Link
        href={"/"}
        onClick={() => {
          setHmenu(true);
        }}
      >
        <div className="flex items-center">
          <Image
            width={100}
            height={100}
            src={Logo.src}
            alt="Logo"
            className="w-[80px]"
          />
          <h1 className={`text-5xl m-[1em] ${mulish.className} sm:hidden`}>
            LovingTails
          </h1>
        </div>
      </Link>
      <div className="lg:hidden text-2xl font-medium uppercase">
        <Link
          className="p-3 m-2 w-[100] transition-opacity hover:underline"
          href={"/store"}
          onClick={() => {
            setHmenu(true);
          }}
        >
          Store
        </Link>
        <Link
          className="p-3 m-2 w-[100]"
          href={"/contacts"}
          onClick={() => {
            setHmenu(true);
          }}
        >
          Contacts
        </Link>
      </div>
      <div className="hidden lg:block">
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
        <div className="absolute top-[152px] left-0 w-full h-full backdrop-blur-xl pt-[100px] flex flex-col text-4xl z-[999] text-[var(--accent-clr1)]">
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
            href={"/contacts"}
            onClick={() => {
              setHmenu(!hmenu);
            }}
          >
            Contacts
          </Link>
        </div>
      )}
    </div>
  );
}
