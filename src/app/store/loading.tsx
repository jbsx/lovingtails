export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center m-5 p-5">
      <div className="container flex flex-wrap justify-center max-w-[2000px] gap-[2px]">
        {[...Array(8).keys()].map((i) => {
          return (
            <div
              key={i}
              className="animate-pulse w-[400px] h-[550px] p-[1em] bg-[rgba(0,0,0,0.03)]
                    sm:w-screen sm:h-fit sm:pb-[50px] text-slate-800"
            >
              loading...
            </div>
          );
        })}
      </div>
    </div>
  );
}
