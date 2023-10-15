export default function Loading() {
  return (
    <div className="mix-blend-multiply flex flex-wrap justify-center mt-[2em] animate-pulse">
      <div className="w-[700px] h-[800px] bg-[var(--accent-clr2)] opacity-50 animate-pulse rounded-2"></div>
      <div className="flex flex-col m-[4em] max-w-[1000px] sm:m-[1em]">
        <h1 className="text-3xl font-semibold py-[0.5em]"></h1>

        <h3 className="text-md w-fit bg-[var(--accent-clr2)] text-white bold p-[0.5em] px-[1em]"></h3>

        <h2 className="text-3xl text-[var(--accent-clr1)] font-semibold py-[0.5em]"></h2>

        <div className="py-[1em]">
          <div className="flex items-center justify-center w-fit px-[4em] py-[1em] hover:bg-[#221f1f] text-white border-2 border-black">
            <div className="w-[50px] h-[50px]" />
          </div>
        </div>

        <div className="w-[100px] h-[50px]"></div>
      </div>
    </div>
  );
}
