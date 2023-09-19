import Compressor from "compressorjs";
export async function compressMany(imgs: File[]): Promise<File[]> {
  const compressPromises = imgs.map((i) => {
    return new Promise((resolve, reject) => {
      new Compressor(i, {
        quality: 0.4,
        success(smallImg) {
          resolve(smallImg);
        },
        error(e) {
          reject(e);
        },
      });
    });
  });
  return (await Promise.all(compressPromises)) as File[];
}
