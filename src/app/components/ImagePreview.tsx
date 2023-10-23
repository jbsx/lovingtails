"use client";
import ImageGallery from "react-image-gallery";
import Image from "next/image";
import { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface Args {
  p: string;
}

export default function ImagePreview(params: Args) {
  const images = params.p.split("|");

  const imggallery: Array<ReactImageGalleryItem> = images.map((path, i) => {
    return {
      original: `${i}`,
      originalAlt: path,
      renderItem: () => {
        return (
          <Image
            width={700}
            height={700}
            placeholder="blur"
            blurDataURL={process.env.URL + "/loading.svg"}
            src={`http://utfs.io/f/${images[i]}`}
            alt={"Product img"}
            key={path}
          />
        );
      },
    };
  });

  return (
    <ImageGallery
      items={imggallery}
      showFullscreenButton={false}
      showPlayButton={false}
      additionalClass="w-[700px]"
    />
  );
}
