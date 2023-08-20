import Link from "next/link";
import Image from "next/image";
import Testimonial from "./components/Testimonial";
import Product from "./components/Product";
import cover from "../../public/lovingtailscover.png";
import db from "../../tempdb/db.json";

export default function Home() {
  const products = db.Products.filter((p) => {
    return p.tag !== undefined;
  });
  return (
    <div className="flex flex-col justify-center items-center mb-[120px]">
      <div className="flex items-center justify-center my-[10vh] w-full">
        <div className="break-normal text-6xl text-[var(--accent-clr2)] max-w-xl m-[2em]">
          Give Your Pet the Gift of Good Health with LovingTails Supplements
        </div>
        <Image
          className="hidden max-w-[800px] xl:block"
          width={800}
          height={800}
          src={cover.src}
          alt="Cover Img"
        />
      </div>
      <div className="bg-[var(--accent-clr1)] w-full py-[7em] flex justify-center p-5">
        <div className="max-w-[1200px] text-2xl text-justify text-zinc-600">
          At LovingTails, we believe that good health is the foundation of
          happiness and longevity for pets. That&apos;s why we&apos;ve developed
          a line of premium supplements that are designed to provide your pet
          with the essential nutrients they need to stay healthy and active.
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center py-[12em]">
        <span className="text-3xl text-[var(--accent-clr2)] font-medium max-w-[1200px] text-center">
          Our premium supplements are formulated to provide your pet with the
          nutrients they need to thrive. Try them today and see the difference!
        </span>
        <div className="flex flex-wrap flex-col lg:flex-row w-full justify-center items-center py-[3em]">
          {products.map((p) => {
            return <Product data={p} />;
          })}
        </div>
        <Link
          href={"/store"}
          className="bg-red-400 p-3 rounded hover:bg-red-500 w-fit"
        >
          Visit Store
        </Link>
      </div>
      <div className="flex flex-col w-full justify-center items-center bg-[var(--accent-clr1)] p-[3em] text-xl text-justify">
        <span className="max-w-[1200px] text-2xl text-justify text-zinc-600">
          Our supplements are made with only the highest quality ingredients and
          are formulated to meet the unique nutritional needs of pets. From our
          Salmon Oil that supports healthy skin and coat to our Joint & Hip
          Syrup that promotes mobility and flexibility, our products are
          designed to help your pet feel their best.
        </span>
      </div>
      <div className="flex flex-col items-center p-[3em] my-[5em] w-full">
        <div className="text-center text-3xl text-[var(--accent-clr2)] font-medium m-[1em]">
          Here are some of our satisfied customers!
        </div>
        <div className="flex justify-center flex-wrap">
          <Testimonial />
          <Testimonial />
          <Testimonial />
        </div>
      </div>
      <div>Newsletter</div>
    </div>
  );
}
