import Link from "next/link";
import Image from "next/image";
import img from "../../../tempdb/products/Doggie Munchies - Mutton and Strawberry/1.jpeg";

interface Data {
  name: String;
  price: number;
  tag?: String;
}

interface Props {
  data: Data;
}

export default function Product({ data }: Props) {
  return (
    <Link href={""}>
      <div className="relative flex flex-col w-[300px] h-[400px] m-2 p-2 border rounded 4xl cursor-pointer mix-blend-darken text-zinc-700 hover:text-zinc-500 hover:shadow-md transition">
        <Image width={300} height={300} src={img.src} alt="product image" />
        <span className="text-xl font-semibold">{data.name}</span>
        {data.tag && (
          <div className="text-md w-fit bg-red-600 text-white bold p-[0.2em] px-[1em] rounded opacity-70">
            {data.tag}
          </div>
        )}
        <span className="text-3xl">INR {data.price}</span>
      </div>
    </Link>
  );
}
