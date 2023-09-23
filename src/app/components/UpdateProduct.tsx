"use client";
import { useRef, useState } from "react";
import Msg from "./Msg";
import { CustomUploader } from "./CustomUploader";
import { useUploadThing } from "../utils/uploadthing";
import { compressMany } from "../utils/imgProcessing";
import Loading from "./Loading";
import { UploadFileResponse } from "uploadthing/client";

export default function UpdateProduct() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: 0,
    desc: "",
    tag: "",
    recommend: false,
    amznlink: "",
  });

  const [loadTitle, setLoadTitle] = useState("");

  const ogTitle = useRef("");

  const [files, setFiles] = useState<Array<File | string>>([]);

  const [loading, setLoading] = useState(false);

  const [msg, setMsg] = useState<{ type: "S" | "E"; message: string } | null>(
    null,
  );

  //Custom Uploader
  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onUploadError: (e) => {
      setMsg({ type: "E", message: e.message });
    },
  });

  const handleSubmit = async () => {
    setLoading(true);

    try {
      //Data validation
      if (files.length === 0) {
        throw Error("Please Upload Image(s)");
      } else if (files.length > 8) {
        throw Error("Maximum number of images: 8");
      }

      //compress images
      const smallImgs = await compressMany(
        //filter out already uploaded images
        files.filter((i) => {
          return i instanceof File;
        }) as File[],
      );

      smallImgs.forEach((i) => {
        if (i.size > 2_000_000) {
          throw Error("File too big: Maximum size is 2MB");
        }
      });

      //Upload new Images
      let res: UploadFileResponse[];
      if (smallImgs.length > 0) {
        res = (await startUpload(smallImgs)) as UploadFileResponse[];
      }

      let temp = [...files];
      let count = 0;
      temp.forEach((i, idx) => {
        if (i instanceof File) {
          temp[idx] = res[count].key;
          count++;
        }
      });
      setFiles(temp);

      //POST to Pscale DB

      let imgs = temp.reduce((acc, curr) => {
        return (acc as string) + "|" + curr;
      });
      console.log(imgs);

      const data = await (
        await fetch(process.env.URL + "/api/db/updateProduct", {
          method: "POST",
          mode: "same-origin",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ ...formData, imgs, ogTitle: ogTitle.current }),
        })
      ).json();

      if (data.success) {
        setMsg({
          type: "S",
          message: "Product Updated",
        });

        setFormData({
          title: "",
          category: "",
          desc: "",
          price: 0,
          tag: "",
          recommend: false,
          amznlink: "",
        });
      } else {
        setMsg({ type: "E", message: data.message });
      }
    } catch (e) {
      if (e instanceof Error) {
        setMsg({ type: "E", message: e.message });
      } else {
        setMsg({
          type: "E",
          message: "Something went wrong. Please try again later",
        });
      }
    }

    //TODO: Cleanup in case of an error
    setLoading(false);
  };

  const inputcss = "min-h-[50px] mb-2 rounded outline-none p-[10px] text-base";

  return (
    <div className="w-[600px] lg:w-full p-2">
      <h1 className="text-3xl font-semibold text-[var(--accent-clr2)]">
        Update Product
      </h1>

      <div className="flex justify-center items-center text-xl gap-[10px] p-4">
        <label>Title: </label>
        <input
          name="loadTitle"
          value={loadTitle}
          className={inputcss}
          onChange={(e) => {
            setLoadTitle(e.target.value);
          }}
        ></input>
        <button
          type="button"
          className="p-2 outline-none rounded border-2 border-[var(--accent-clr2)] hover:bg-[var(--accent-clr2)] hover:text-white"
          onClick={async () => {
            try {
              const res = await (
                await fetch(process.env.URL + `/api/db/getProductByTitle`, {
                  method: "POST",
                  body: JSON.stringify({
                    title: loadTitle,
                  }),
                }).catch((e) => {
                  throw e;
                })
              ).json();

              if (!res.success)
                throw Error("Something went wrong. Please check input again.");

              setFormData({ ...res.product });
              setFiles(res.product.imgs.split("|"));
              ogTitle.current = loadTitle;
            } catch (e) {
              if (e instanceof Error) {
                setMsg({ type: "E", message: e.message });
              } else {
                setMsg({
                  type: "E",
                  message: "Something went wrong. Please try again later",
                });
              }
            }
          }}
        >
          Load
        </button>
      </div>

      {msg && <Msg type={msg.type} message={msg.message} />}

      <form
        className="flex flex-col gap-[10px] text-lg"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label>
          Title:
          <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          value={formData.title}
          className={inputcss}
          onChange={(prev) => {
            setFormData({ ...formData, title: prev.target.value });
          }}
        />

        <label>
          Category:
          <span className="text-red-500">*</span>
        </label>
        <input
          name="category"
          value={formData.category}
          className={inputcss}
          onChange={(event) => {
            setFormData({ ...formData, category: event.target.value });
          }}
        />

        <label>
          Description:
          <span className="text-red-500">*</span>
        </label>
        <textarea
          name="desc"
          value={formData.desc}
          className={inputcss}
          onChange={(prev) => {
            setFormData({ ...formData, desc: prev.target.value });
          }}
        ></textarea>

        <label>
          Price:
          <span className="text-red-500">*</span>
        </label>
        <input
          name="price"
          value={formData.price}
          className={inputcss}
          onChange={(event) => {
            setFormData({ ...formData, price: parseFloat(event.target.value) });
          }}
        />

        <label>Tag:</label>
        <input
          name="tag"
          value={formData.tag}
          className={inputcss}
          onChange={(prev) => {
            setFormData({ ...formData, tag: prev.target.value });
          }}
        />

        <div className="flex items-center h-[50px] gap-[10px]">
          <label>Feature Product: </label>
          <input
            name="recommend"
            type="checkbox"
            value="recommend"
            onChange={(e) => {
              setFormData({ ...formData, recommend: e.target.checked });
            }}
          />
        </div>

        <label>
          Amazon Link:
          <span className="text-red-500">*</span>
        </label>
        <input
          name="link"
          value={formData.amznlink}
          className={inputcss}
          onChange={(prev) => {
            setFormData({ ...formData, amznlink: prev.target.value });
          }}
        />

        <label>
          Image(s):
          <span className="text-red-500">*</span>
        </label>
        <CustomUploader
          permittedFileInfo={permittedFileInfo}
          files={files}
          setFiles={setFiles}
        />

        <button
          className="cursor-pointer text-[var(--accent-clr2)] max-w-[200px] hover:bg-[var(--accent-clr2)]
                    hover:text-white p-4 uppercase text-xl font-semibold border-[4px] border-[var(--accent-clr2)]
                    outline-none"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="w-full h-[50px]">{loading && <Loading />}</div>
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
}
