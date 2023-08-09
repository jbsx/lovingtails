import cover from "../../public/lovingtailscover.png";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center mb-[120px]">
      <div className="flex flex-wrap items-center justify-center my-[10vh] w-fit">
        <div className="break-normal text-6xl text-[var(--accent-clr2)] max-w-xl m-[2em]">
          Give Your Pet the Gift of Good Health with LovingTails Supplements
        </div>
        <img
          className="max-w-[800px] object-contain"
          src={cover.src}
          alt="Cover Img"
        />
      </div>
      <div>
        [ ] Best Sellers <br /> [ ] Testimonials <br /> [ ] Socials
      </div>
    </div>
  );
}
