"use client";
import { useRef, Dispatch, SetStateAction } from "react";
import Image from "next/image";

export default function ImageReorder(params: {
  files: Array<File>;
  setFiles: Dispatch<SetStateAction<Array<File>>>;
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
            className="relative"
          >
            <div className="absolute left-0 top-0 rounded-full bg-white w-[20px] h-[20px] flex justify-center items-center text-sm">
              {idx + 1}
            </div>
            <Image
              src={URL.createObjectURL(i)}
              alt={i.name}
              height={100}
              width={100}
              className="aspect-square cursor-move"
            />
          </div>
        );
      })}
    </div>
  );
}
