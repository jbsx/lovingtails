import Logo from "../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Mulish } from "next/font/google";

const mulish = Mulish({ subsets: ["latin"] });

export default function Navbar() {
  return (
    <div className="flex justify-around items-center p-4 text-center text-[var(--accent-clr2)] font-bold text-xl px-4 w-screen">
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
className={`text-5xl m-[1em] ${mulish.className} md:text-4xl sm:text-3xl`}
          >
            LovingTails
          </h1>
        </div>
      </Link>
      <div className="lg:hidden flex text-2xl font-medium uppercase transition-all">
        <Link className="p-3 m-2 w-[100] group transition-all" href={"/store"}>
          Store
          <span className="block max-w-0 group-hover:max-w-full duration-300 h-0.5 bg-[var(--accent-clr1)]"></span>
        </Link>
        <Link
          className="p-3 m-2 w-[100] group transition-all"
          href={"/contacts"}
        >
          Contacts
          <span className="block max-w-0 group-hover:max-w-full duration-300 h-0.5 bg-[var(--accent-clr1)]"></span>
        </Link>
      </div>
    </div>
  );
}
