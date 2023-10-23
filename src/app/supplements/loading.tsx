import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center max-w-[1250px]">
        <h1 className="text-4xl text-[var(--accent-clr2)] font-semibold p-[0.5em] pt-[3em] text-left w-full uppercase">
          Supplements
        </h1>
        <div>
          {[...Array(2).keys()].map((idx) => {
            return (
              <div
                className={`flex gap-[50px] py-[4em] ${
                  idx % 2 === 1 ? "flex-row-reverse" : ""
                } md:flex-col`}
                key={idx}
              >
                <div className="flex flex-col gap-[10px] text-center">
                  <h1 className="text-xl text-[var(--accent-clr1)] font-semibold">
                    Loading...
                  </h1>
                  <div
                    className="animate-pulse w-[400px] h-[550px] p-[1em] bg-[rgba(0,0,0,0.03)]
                    sm:w-screen sm:h-fit sm:pb-[50px] text-slate-800"
                  ></div>
                </div>
                <div className="md:p-4 w-[600px] flex justify-center items-center">
                  <Image
                    src={process.env.URL + "/loading.svg"}
                    width={80}
                    height={80}
                    alt="loading spinner"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
