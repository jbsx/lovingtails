import Link from "next/link";
import img from "../../../public/lovingtailscover.png";

interface Props {
  name: String;
  price: number;
}

export default function Product({ name, price }: Props) {
  return (
    <Link href={""}>
      <div className="flex flex-col w-[300px] h-[400px] m-2 p-2 border-2 cursor-pointer">
        <img src={img.src} alt="product image" />
        <span className="text-xl">{name}</span>
        <span className="uppercase text-3xl">₹ {price}</span>
      </div>
    </Link>
  );
}
