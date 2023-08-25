"use client";
import Image from "next/image";
import { dbType, importimgs } from "../utils";
import ImageGallery from "react-image-gallery";
import { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface Params {
  p: dbType;
  paths: Array<string>;
}

export default function ImagePreview(params: Params) {
  const images = importimgs(params.p.name, params.paths);

  const imggallery: Array<ReactImageGalleryItem> = params.paths.map(
    (path, i) => {
      return {
        original: `../../../tempdb/products/${params.p.name}/${path}`,
        originalAlt: path,
        renderItem: () => {
          return (
            <Image
              width={800}
              height={800}
              src={images[i]}
              alt={"Product img"}
              key={params.p.name}
            />
          );
        },
        renderThumbInner: () => {
          return (
            <Image
              width={50}
              height={50}
              src={images[i]}
              alt={params.p.name}
            ></Image>
          );
        },
      };
    },
  );

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
