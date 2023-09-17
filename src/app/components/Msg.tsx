export default function Msg(params: { type: "E" | "S"; message: string }) {
  return (
    <div
      className={`p-4 flex justify-center rounded font-semibold border-2 ${
        params.type === "S"
          ? "border-green-500 text-green-500"
          : "border-red-500 text-red-500"
      }`}
    >
      {params.message}
    </div>
  );
}
