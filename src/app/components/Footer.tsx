import Link from "next/link";
export default function Footer() {
  return (
    <div className="bg-[var(--accent-clr2)] text-zinc-200 font-bold flex flex-col justify-center h-[120px] items-center">
      <div className="text-center">
        Find Us On
        <div className="flex flex-wrap">
          <Link href={"/"}>Instagram</Link>
          <Link href={"/"}>Facebook</Link>
          <Link href={"/"}>Twitter</Link>
          <Link href={"/"}>Threads</Link>
          <Link href={"/"}>Pinterest</Link>
        </div>
      </div>
      <span>© COPYRIGHT - LovingTails - 2023</span>
    </div>
  );
}
