"use client";
import { useRef, Dispatch, SetStateAction } from "react";
import Image from "next/image";

export default function ImageReorder(params: {
  files: Array<File | string>;
  setFiles: Dispatch<SetStateAction<Array<File | string>>>;
}) {
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  const reorder = () => {
    params.setFiles((prev) => {
      const arr = [...prev];

      const dItem = arr.splice(dragItem.current, 1)[0];
      arr.splice(dragOverItem.current, 0, dItem);

      dragOverItem.current = null;
      dragItem.current = null;

      return arr;
    });
  };

  return (
    <div className="flex flex-wrap gap-[5px]">
      {params.files.map((i, idx) => {
        return (
          <div
            onDragStart={() => {
              dragItem.current = idx;
            }}
            onDragEnter={() => {
              dragOverItem.current = idx;
            }}
            onDragEnd={() => {
              reorder();
            }}
            key={idx}
            className="relative group"
          >
            <div
              className="absolute left-[-3px] top-[-3px] flex justify-center items-center rounded-full bg-white
                         w-[20px] h-[20px] text-sm font-medium border-2 border-[var(--accent-clr2)]"
            >
              {idx + 1}
            </div>
            <div
              className="absolute right-[-3px] top-[-3px] flex justify-center items-center rounded-full bg-white
                         w-[20px] h-[20px] text-sm font-medium border-2 border-[var(--accent-clr2)]
                         cursor-pointer"
              onClick={async () => {
                params.setFiles((prev: Array<File | string>) => {
                  const temp = [...prev];
                  temp.splice(idx, 1);
                  return temp;
                });
              }}
            >
              ✕
            </div>
            {typeof i === "string" ? (
              <Image
                src={`http://utfs.io/f/${i}`}
                alt={i}
                height={100}
                width={100}
                className="aspect-square cursor-move rounded-xl"
              />
            ) : (
              <Image
                src={URL.createObjectURL(i)}
                alt={i.name}
                height={100}
                width={100}
                className="aspect-square cursor-move rounded-xl"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
