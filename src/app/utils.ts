export function getFiles(path: string): Array<string> {
  const fs = require("fs");
  let res: Array<string> = [];
  fs.readdir(path, (err: Error, files: Array<string>) => {
    if (err) {
      console.log(err);
    } else {
      res = structuredClone(files);
    }
  });
  console.log("res: " + res);
  return res;
}
