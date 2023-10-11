"use client";
import ImageGallery from "react-image-gallery";
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
          <img
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
      lazyLoad={true}
      additionalClass="w-[700px]"
    />
  );
}
