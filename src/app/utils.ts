import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface dbType {
  name: string;
  price: number;
  tag?: string;
  links: Array<string>;
  desc: string;
}

export function importimgs(
  dir: string,
  paths: Array<string>,
): Array<StaticImport> {
  let res: Array<StaticImport> = paths.map((p) => {
    return require(`../../tempdb/products/${dir}/${p}`);
  });

  return res;
}
