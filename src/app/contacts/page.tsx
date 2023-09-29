import { MdChat, MdHeadsetMic } from "react-icons/md";

export default function contacts() {
  return (
    <div className="flex flex-col items-center w-fit m-auto py-5">
      <div>
        <h1 className="text-4xl p-2 text-left">Get in touch</h1>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-[2em] p-5">
        <div
          className="flex flex-col justify-center items-center p-[4em] bg-[var(--background-hex)] w-[600px] border-2 h-[400px]
                     md:w-full"
        >
          <MdChat className="w-[50px] h-[50px]" />
          <h2 className="text-xl">Talk to Sales</h2>
          <a href="mailto:placeholder@gmail.com">placeholder@gmail.com</a>
        </div>
        <div
          className="flex flex-col justify-center items-center p-[4em] bg-[var(--background-hex)] w-[600px] border-2 h-[400px]
                     md:w-full"
        >
          <MdHeadsetMic className="w-[50px] h-[50px]" />
          <h2 className="text-xl">Talk to Customer Service</h2>
          +91 XXXXXXXXXX
        </div>
      </div>
    </div>
  );
}
