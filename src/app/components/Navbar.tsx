"use client";

import Logo from "../../../public/logo.png";
import Link from "next/link";
import { Menu, Cross } from "../imports";
import { useState } from "react";

export default function Navbar() {
  const [hmenu, setHmenu] = useState(true);

  return (
    <div className="bg-[var(--accent-clr1)] flex justify-between items-center p-4 text-center text-[var(--accent-clr2)] font-bold text-xl px-4">
      <Link href={"/"}>
        <div className="flex items-center">
          <img className="max-h-[120px]" src={Logo.src} alt="Logo" />
          <span className="text-4xl m-[1em]">LovingTails</span>
        </div>
      </Link>
      <div className="hidden lg:block text-xl">
        <Link className="p-3 m-2 w-[100]" href={"/store"}>
          Store
        </Link>
        <Link className="p-3 m-2 w-[100]" href={"/reviews"}>
          Reviews
        </Link>
        <Link className="p-3 m-2 w-[100]" href={"/contact"}>
          Contact Us
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
        <div className="absolute top-[152px] left-0 w-[100vw] min-h-[100vh] backdrop-blur pt-[100px] flex flex-col text-4xl">
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
            href={"/reviews"}
            onClick={() => {
              setHmenu(!hmenu);
            }}
          >
            Reviews
          </Link>
          <Link
            className="p-3 m-2 w-[100]"
            href={"/contact"}
            onClick={() => {
              setHmenu(!hmenu);
            }}
          >
            Contact Us
          </Link>
        </div>
      )}
    </div>
  );
}
