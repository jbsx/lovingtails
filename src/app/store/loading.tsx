import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center m-5 p-5">
      <div className="container flex flex-wrap justify-center max-w-[2000px] gap-[2px]">
        {[...Array(8).keys()].map((i) => {
          return (
            <div
              key={i}
              className="flex justify-center items-center animate-pulse w-[400px] h-[550px] p-[1em]
                         bg-[rgba(0,0,0,0.03)] sm:w-screen sm:h-fit sm:pb-[50px] text-slate-800"
            >
              <Image
                src={process.env.URL + "/loading.svg"}
                width={300}
                height={300}
                alt="loading spinner"
                className="m-auto"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
