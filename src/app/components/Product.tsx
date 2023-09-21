import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { dataSchema } from "../utils/zodTypes";

interface props {
  data: z.infer<typeof dataSchema>;
}

export default function Product({ data }: props) {
  const imgs = data.imgs.split("|");
  return (
    <Link href={`/store/${data.title}`}>
      <div
        className="relative flex flex-col justify-center items-center w-[400px] h-[550px] p-[1em]
                   hover:border hover:border-[var(--accent-clr1)] cursor-pointer text-zinc-700 bg-[rgba(0,0,0,0.03)]
                hover:bg-[var(--backgound-hex)] hover:text-[var(--accent-clr1)] sm:w-screen sm:h-fit sm:pb-[50px] group"
      >
        <Image
          width={300}
          height={300}
          src={`http://utfs.io/f/${imgs[0]}`}
          alt={data.title}
          className="overflow-hidden mix-blend-darken max-h-[300px]"
        />

        <div className="group-hover:translate-y-[-20px] transition-all w-full">
          <h1 className="text-xl font-medium my-[1em] overflow-hidden">
            {data.title}
          </h1>

          <span className="text-3xl font-semibold">
            {data.price == -1 ? "Out of stock" : `₹ ${data.price}`}
          </span>
        </div>
        {data.tag && (
          <div
            className="absolute bottom-0 left-0 text-md w-full group-hover:bg-[var(--accent-clr1)] 
                        bg-[var(--accent-clr2)] text-white font-medium p-[0.2em] px-[1em]"
          >
            {data.tag}
          </div>
        )}
      </div>
    </Link>
  );
}
