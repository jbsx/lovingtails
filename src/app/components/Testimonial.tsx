import Image from "next/image";
import Milo from "../../../public/milo.png";
export default function Testimonial() {
  return (
    <div className="max-w-[600px] flex flex-col justify-center items-center bg-[var(--main-clr)] p-[2em] m-[1em] text-white sm:w-screen">
      <Image
        width={150}
        height={150}
        src={Milo.src}
        alt="img photo"
        className="rounded-full aspect-square"
      />
      <div className="text-2xl p-[1em]">Name | XX year old | Breed</div>
      <div className="text-xl">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.
      </div>
    </div>
  );
}
