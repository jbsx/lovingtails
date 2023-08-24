"use client";
import Image from "next/image";
import { dbType } from "../utils";
import ImageGallery from "react-image-gallery";
import { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface Params {
  p: dbType;
  paths: Array<string>;
}

export default function ImagePreview(params: Params) {
  const images: Array<ReactImageGalleryItem> = params.paths.map((path) => {
    return {
      original: `../../../tempdb/products/${params.p.name}/${path}`,
      originalAlt: path,
      renderItem: (item) => {
        return (
          <Image
            width={500}
            height={500}
            src={require("../../../tempdb/products/Hip and Joint/1.jpg")}
            alt={"Product img"}
            key={params.p.name}
          />
        );
      },
    };
  });

  return (
    <ImageGallery
      items={images}
      showFullscreenButton={false}
      showPlayButton={false}
      showNav={false}
    />
  );
}
