import Link from "next/link";
import Image from "next/image";
import Testimonial from "./components/Testimonial";
import Product from "./components/Product";
import { z } from "zod";
import { dataSchema } from "./utils/zodTypes";
import cover from "../../public/lovingtailscover.png";
import bone from "../../public/bone.svg";

export default async function Home() {
  const getRecommendedProducts = async () => {
    const res = await fetch(process.env.URL + "/api/db/getProductsFeatured", {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) return data.products;
    } else {
      return [];
    }
  };

  const products = (await getRecommendedProducts()) as Array<
    z.infer<typeof dataSchema>
  >;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center my-[10vh] w-full">
        <h2 className="break-normal text-5xl max-w-xl leading-snug tracking-wider md:text-4xl mx-[2em]">
          Give Your Pet the Gift of Good Health with{" "}
          <span className="text-[var(--accent-clr1)] font-medium">
            LovingTails
          </span>{" "}
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

      <div className="my-[15vh] text-xl text-justify bg-[var(--accent-clr2)] max-w-[1200px] relative py-[2em] z-[2] text-white font-medium">
        <div className="text-2xl leading-loose p-[2em] text-center sm:p-[0.5em] sm:text-xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url(../../public/bowl_white.png)] bg-origin-content bg-[length:60px_40px] z-[-1] opacity-[10%]"></div>
          At LovingTails, we believe that good health is the foundation of
          happiness and longevity for pets. That&apos;s why we&apos;ve developed
          a line of premium supplements that are designed to provide your pet
          with the essential nutrients they need to stay healthy and active.
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center py-[12em] text-[var(--accent-clr2)]">
        <span className="text-3xl font-medium max-w-[1200px] text-center">
          Our premium supplements are formulated to provide your pet with the
          nutrients they need to thrive. Try them today and see the difference!
        </span>
        <div className="flex flex-wrap lg:flex-col w-full justify-center items-center py-[5em] gap-[2px]">
          {products.map((p: z.infer<typeof dataSchema>) => {
            return <Product data={p} key={p.title} />;
          })}
        </div>
        <Link
          href={"/store"}
          className="bg-[var(--accent-clr2)] px-[2em] py-[1em] hover:bg-[var(--accent-clr1)] text-white w-fit font-semibold active:drop-shadow-md"
        >
          Visit Store
        </Link>
      </div>

      <div className="flex flex-col items-center w-full my-[15vh] p-5">
        <div className="flex justify-center items-center">
          <img
            src={bone.src}
            alt="bone"
            className="rotate-[150deg] w-[300px] lg:hidden p-[1em]"
          />
          <p
            className="w-[800px] md:w-fit text-3xl leading-loose border-l-4 border-[var(--accent-clr2)] p-[1em] 
                    lg:border-none lg:text-2xl lg:text-center"
          >
            Our supplements are made with only the highest quality ingredients
            and are formulated to meet the unique nutritional needs of pets.
            From our Salmon Oil that supports healthy skin and coat to our Joint
            & Hip Syrup that promotes mobility and flexibility, our products are
            designed to help your pet feel their best.
          </p>
        </div>
        <Link
          href={"/supplements"}
          className="bg-[var(--accent-clr2)] px-[2em] py-[1em] hover:bg-[var(--accent-clr1)] text-white w-fit font-semibold active:drop-shadow-md"
        >
          Supplements
        </Link>
      </div>

      <div className="flex flex-col items-center p-[3em] my-[5em] w-full">
        <div className="text-center text-3xl font-medium m-[1em]">
          Here are some of our satisfied customers!
        </div>
        <div className="flex justify-center flex-wrap gap-[20px]">
          <Testimonial />
          <Testimonial />
          <Testimonial />
        </div>
      </div>
    </div>
  );
}
