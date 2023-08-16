import Link from "next/link";
import img from "../../../tempdb/products/Doggie Munchies - Mutton and Strawberry/1.jpeg";

interface Props {
  name: String;
  price: number;
  tag?: String;
}

export default function Product({ name, price, tag }: Props) {
  return (
    <Link href={""}>
      <div className="relative flex flex-col w-[300px] h-[400px] m-2 p-2 border rounded 4xl cursor-pointer mix-blend-darken hover:text-zinc-500 transition">
        <img
          src={img.src}
          alt="product image"
          className="w-[300px] aspect-square"
        />
        <span className="text-xl">{name}</span>
        <span className="uppercase text-3xl">₹ {price}</span>
        {tag && (
          <div className="absolute top-0 right-0 bg-red-600 text-white bold p-[0.5em] rounded opacity-70">
            {tag}
          </div>
        )}
      </div>
    </Link>
  );
}
