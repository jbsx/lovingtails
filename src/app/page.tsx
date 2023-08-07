import Socials from "./components/Socials";
import cover from "../../public/retriever.jpg";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-wrap items-center min-h-[66vh]">
        <div className="break-normal text-6xl text-[var(--accent-clr2)] max-w-xl m-[2em]">
          Give Your Pet the Gift of Good Health with LovingTails Supplements
        </div>
        <img
          className="rounded-lg max-w-[1000px]"
          src={cover.src}
          alt="Cover Img"
        />
      </div>
      <div>
        [ ] Best Sellers <br /> [ ] Testimonials <br /> [ ] Socials
      </div>
      <br />
    </div>
  );
}
