import Image from "next/image";

export default function Loading() {
  return (
    <Image
      src="/loading.svg"
      alt="spinner"
      width={200}
      height={200}
      className="h-full aspect-square"
    />
  );
}
