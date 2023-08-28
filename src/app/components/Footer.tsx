import Link from "next/link";
export default function Footer() {
  return (
    <div className="bg-[var(--main-clr)] text-zinc-200 flex flex-col justify-center items-center font-medium">
      <div className="flex flex-wrap w-screen max-w-[1000px] justify-around">
        <div className="flex flex-col flex-wrap m-[2em]">
          <span className="font-bold">Contact Us:</span>
          +91-XXXXXXXXXX
          <a href="mailto:lovingtails.care@gmail.com">
            lovingtails.care@gmail.com
          </a>
        </div>
        <div className="m-[2em]">
          <span className="font-bold">Find Us On:</span>
          <div className="flex flex-col flex-wrap">
            <Link href={"https://www.instagram.com/lovingtails.care/"}>
              Instagram
            </Link>
            <Link href={"https://www.facebook.com"}>Facebook</Link>
            <Link href={"https://www.twitter.com"}>Twitter</Link>
            <Link href={"/"}>Threads</Link>
          </div>
        </div>
      </div>
      <span className="font-bold">© COPYRIGHT - LovingTails - 2023</span>
    </div>
  );
}
