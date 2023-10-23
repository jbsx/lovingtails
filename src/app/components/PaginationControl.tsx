"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function PaginationControl({
  max_pages,
  route,
}: {
  max_pages: number;
  route: string;
}) {
  const router = useRouter();
  const useParams = useSearchParams();

  const page = parseInt(useParams?.get("page") ?? "1");

  return (
    <div className="flex gap-[20px] items-center text-lg font-semibold text-[#e07d5e]">
      <button
        onClick={() => {
          if (page > 1) router.push(`/store?page=${Number(page) - 1}`);
        }}
        className={`flex justify-center items-center outline-none px-[1em] border-2 border-[#e07d5e] text-[#e07d5e] hover:text-white hover:bg-[#e07d5e] ${
          page > 1 ? "" : "hidden"
        }`}
      >
        <MdKeyboardArrowLeft className="h-[40px] w-[40px]" />
        Prev
      </button>
      {`Page ${page}/${max_pages}`}
      <button
        onClick={() => {
          if (page < max_pages)
            router.push(`${route}?page=${Number(page) + 1}`);
        }}
        className={`flex justify-center items-center outline-none px-[1em] border-2 border-[#e07d5e] text-[#e07d5e]
                    hover:text-white hover:bg-[#e07d5e] ${
                      page < max_pages ? "" : "hidden"
                    }`}
      >
        Next
        <MdKeyboardArrowRight className="h-[40px] w-[40px]" />
      </button>
    </div>
  );
}
