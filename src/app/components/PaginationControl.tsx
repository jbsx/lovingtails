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

  const page = useParams.get("page") ?? 1;

  return (
    <div className="flex gap-[10px] items-center text-lg">
      <button
        onClick={() => {
          if (page == 1) return;
          router.push(`/store?page=${Number(page) - 1}`);
        }}
        className="outline-none border-2 border-[var(--acccent-clr2)] hover:bg-[var(--acccent-clr2)] rounded-md"
      >
        <MdKeyboardArrowLeft className="h-[40px] w-[40px]" />
      </button>
      {`${page}/${max_pages}`}
      <button
        onClick={() => {
          if (page == max_pages) return;
          router.push(`${route}?page=${Number(page) + 1}`);
        }}
        className="outline-none border-2 border-[var(--acccent-clr2)] hover:bg-[var(--acccent-clr2)] rounded-md"
      >
        <MdKeyboardArrowRight className="h-[40px] w-[40px]" />
      </button>
    </div>
  );
}
