import Logo from "../../../public/logo.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-[var(--accent-clr1)] flex justify-between items-center p-3 text-center text-[var(--accent-clr2)] font-bold text-xl px-[4em]">
      <div className="flex items-center">
        <img className="h-[120px]" src={Logo.src} alt="Logo" />
        <span className="text-4xl m-[1em]">LovingTails</span>
      </div>

      <div>
        <Link className="p-3 m-2 w-[100] hover:bg-white/[0.3]" href={"/store"}>
          Store
        </Link>
        <Link
          className="p-3 m-2 w-[100] hover:bg-white/[0.3]"
          href={"/reviews"}
        >
          Reviews
        </Link>
        <Link
          className="p-3 m-2 w-[100] hover:bg-white/[0.3]"
          href={"/contact"}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
