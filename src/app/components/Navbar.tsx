import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-[var(--accent-clr2)] flex justify-end p-3 text-center text-zinc-100 font-bold">
      <Link className="p-2 m-2 w-[100] hover:bg-white/[0.3]" href={"/store"}>
        STORE
      </Link>
      <Link className="p-2 m-2 w-[100] hover:bg-white/[0.3]" href={"/blog"}>
        BLOG
      </Link>
      <Link className="p-2 m-2 w-[100] hover:bg-white/[0.3]" href={"/reviews"}>
        REVIEWS
      </Link>
      <Link className="p-2 m-2 w-[100] hover:bg-white/[0.3]" href={"/faqs"}>
        FAQs
      </Link>
    </div>
  );
}
