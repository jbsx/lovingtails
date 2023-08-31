import Link from "next/link";
import Image from "next/image";
import Testimonial from "./components/Testimonial";
import Product from "./components/Product";
import db from "../../tempdb/db.json";
import ribbon from "../../public/ribbon.png";
import cover from "../../public/lovingtailscover.png";

export default function Home() {
  const products = db.Products.filter((p) => {
    return p.tag !== undefined;
  });
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center my-[10vh] w-full">
        <h2 className="break-normal text-5xl max-w-2xl m-[2em] leading-snug md:text-4xl">
          Give Your Pet the Gift of Good Health with{" "}
          <span className="text-[var(--accent-clr3)]">LovingTails</span>{" "}
          Supplements!
        </h2>
        <Image
          className="max-w-[800px] lg:hidden"
          width={800}
          height={800}
          src={cover.src}
          alt="Cover Img"
        />
      </div>

      <img
        src={ribbon.src}
        alt="ribbon"
        className="absolute top-[40vh] opacity-[60%] z-[-1] lg:hidden w-full"
      />

      <div className="w-full my-[20vh] flex justify-center items-center p-5">
        <p className="max-w-[1200px] text-2xl text-center leading-loose">
          At LovingTails, we believe that good health is the foundation of
          happiness and longevity for pets. That&apos;s why we&apos;ve developed
          a line of premium supplements that are designed to provide your pet
          with the essential nutrients they need to stay healthy and active.
        </p>
      </div>

      <div className="w-full flex flex-col justify-center items-center py-[12em] text-[var(--accent-clr2)]">
        <span className="text-3xl font-medium max-w-[1200px] text-center">
          Our premium supplements are formulated to provide your pet with the
          nutrients they need to thrive. Try them today and see the difference!
        </span>
        <div className="flex flex-wrap lg:flex-col w-full justify-center items-center py-[5em]">
          {products.map((p) => {
            return <Product data={p} key={p.name} />;
          })}
        </div>
        <Link
          href={"/store"}
          className="bg-[var(--accent-clr2)] px-[2em] py-[1em] hover:bg-[var(--accent-clr3)] text-white w-fit font-semibold"
        >
          Visit Store
        </Link>
      </div>

      <div className="my-[5em] text-xl text-justify bg-[var(--accent-clr3)] max-w-[1200px] relative py-[2em] z-[-2]">
        <div className="text-2xl leading-loose p-[2em] text-center sm:p-[0.5em] sm:text-xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url(../../public/bowl.png)] bg-origin-content bg-[length:80px_60px] z-[-1] opacity-[10%]"></div>
          Our supplements are made with only the highest quality ingredients and
          are formulated to meet the unique nutritional needs of pets. From our
          Salmon Oil that supports healthy skin and coat to our Joint & Hip
          Syrup that promotes mobility and flexibility, our products are
          designed to help your pet feel their best.
        </div>
      </div>

      <div className="flex flex-col items-center p-[3em] my-[5em] w-full">
        <div className="text-center text-3xl font-medium m-[1em]">
          Here are some of our satisfied customers!
        </div>
        <div className="flex justify-center flex-wrap">
          <Testimonial />
          <Testimonial />
          <Testimonial />
        </div>
      </div>
    </div>
  );
}
