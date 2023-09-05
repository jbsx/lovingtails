import Logo from "../../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"] });

export default function Navbar() {
  return (
    <div className="flex justify-around items-center p-4 text-center text-white font-bold text-xl px-4 w-screen bg-[var(--accent-clr2)]">
      <Link href={"/"}>
        <div className="flex items-center">
          <Image
            width={100}
            height={100}
            src={Logo.src}
            alt="Logo"
            className="w-[80px]"
          />
          <div className="flex flex-col gap-[5px]">
            <h1
              className={`text-5xl mx-[1em] ${manrope.className} md:text-4xl sm:text-3xl font-bold`}
            >
              LovingTails
            </h1>
            <h2 className="text-base font-semibold text-[var(--accent-clr1)]">
              Healthy Pets Endless Joy
            </h2>
          </div>
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
