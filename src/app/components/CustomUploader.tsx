"use client";
import React from "react";
import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useCallback } from "react";
import ImageReorder from "./ImageReorder";

export function CustomUploader(params: {
  permittedFileInfo: any;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    params.setFiles((i) => {
      return [...i, ...acceptedFiles];
    });
  }, []);

  const fileTypes = params.permittedFileInfo?.config
    ? Object.keys(params.permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div className="flex flex-col gap-2">
      <ImageReorder files={params.files} setFiles={params.setFiles} />
      <div
        {...getRootProps()}
        className="flex flex-col justify-center items-center h-[200px] w-full text-[var(--accent-clr1)] cursor-pointer
                border-[3px] border-dotted rounded-xl border-[var(--accent-clr1)] hover:text-[var(--accent-clr2)]"
      >
        <span>Drop images here! (upto 8 or 2MB)</span>
        <span>or click to browse files</span>
        <input {...getInputProps()} className="outline-none" />
      </div>
    </div>
  );
}
