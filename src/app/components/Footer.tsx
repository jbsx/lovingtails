import Link from "next/link";
import { MdPhone, MdMail } from "react-icons/md";
import {
  PiInstagramLogoBold,
  PiFacebookLogoBold,
  PiTwitterLogoBold,
} from "react-icons/pi";

export default function Footer() {
  return (
    <div className="bg-[var(--accent-clr2)] text-zinc-200 flex flex-col justify-center items-center font-medium">
      <div className="flex flex-wrap w-screen max-w-[1000px] justify-around sm:justify-normal">
        <div className="flex flex-col flex-wrap m-[2em]">
          <span className="font-bold">Contact Us:</span>
          <div className="flex gap-[10px] items-center">
            <MdPhone />
            +91-XXXXXXXXXX
          </div>
          <div className="flex gap-[10px] items-center">
            <MdMail />
            <a href="mailto:lovingtails.care@gmail.com">
              lovingtails.care@gmail.com
            </a>
          </div>
        </div>
        <div className="m-[2em]">
          <span className="font-bold">Find Us On:</span>
          <div className="flex flex-col flex-wrap">
            <Link
              href={"https://www.instagram.com/lovingtails.care/"}
              className="flex items-center gap-[10px]"
            >
              <PiInstagramLogoBold className="h-[20px] w-[20px]" />
              Instagram
            </Link>
            <Link
              href={"https://www.facebook.com"}
              className="flex items-center gap-[10px]"
            >
              <PiFacebookLogoBold className="h-[20px] w-[20px]" />
              Facebook
            </Link>
            <Link
              href={"https://www.twitter.com"}
              className="flex items-center gap-[10px]"
            >
              <PiTwitterLogoBold className="h-[20px] w-[20px]" />
              Twitter
            </Link>
          </div>
        </div>
      </div>
      <span className="font-bold">© COPYRIGHT - LovingTails - 2023</span>
    </div>
  );
}
