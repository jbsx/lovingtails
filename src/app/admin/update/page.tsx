"use client";
import { useRef, useState } from "react";
import { CustomUploader } from "../../components/CustomUploader";
import { useUploadThing } from "../../utils/uploadthing";
import { compressMany } from "../../utils/imgProcessing";
import Loading from "../../components/Loading";
import { UploadFileResponse } from "uploadthing/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dataSchema } from "@/app/utils/zodTypes";

export default function UpdateProduct() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: 0,
    desc: "",
    tag: "",
    priority: 0,
    amznlink: "",
  });

  const [loadTitle, setLoadTitle] = useState("");

  const ogTitle = useRef("");

  const [files, setFiles] = useState<Array<File | string>>([]);

  const [loading, setLoading] = useState(false);

  //Custom Uploader
  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onUploadError: (e) => {
      toast.error(e.message);
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

      //Validate form data
      const reqBody = dataSchema.parse(formData);

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

      const data = await (
        await fetch(process.env.URL + "/api/db/updateProduct", {
          method: "POST",
          mode: "same-origin",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ ...reqBody, imgs, ogTitle: ogTitle.current }),
        })
      ).json();

      if (data.success) {
        toast.success("Product Updated");

        setFormData({
          title: "",
          category: "",
          desc: "",
          price: 0,
          tag: "",
          priority: 0,
          amznlink: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    }

    //TODO: Cleanup in case of an error
    setLoading(false);
  };

  const inputcss = "min-h-[50px] mb-2 rounded outline-none p-[10px] text-base";

  return (
    <div className="flex flex-col items-center">
      <ToastContainer position="bottom-right" autoClose={10_000} />
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
                  throw Error(
                    "Something went wrong. Please check input again.",
                  );

                setFormData({ ...res.product });
                setFiles(res.product.imgs.split("|"));
                ogTitle.current = loadTitle;
              } catch (e) {
                if (e instanceof Error) {
                  toast.error(e.message);
                } else {
                  toast.error("Something went wrong. Please try again later");
                }
              }
            }}
          >
            Load
          </button>
        </div>

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
            <div className="relative flex group">
              <span className="text-blue-400 font-semibold">ⓘ</span>
              <div className="absolute hidden group-hover:block bg-[var(--background-hex)] w-[300px] border-2 p-4 whitespace-pre-wrap">
                {
                  "This text will be treated as Markup. Markup can be used to format text into html."
                }
                <a
                  className="text-blue-400 font-semibold"
                  target="_blank"
                  href="https://www.markdownguide.org/basic-syntax/"
                >
                  Click here for Markup syntax.
                </a>
              </div>
            </div>
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
              setFormData({
                ...formData,
                price: parseFloat(event.target.value),
              });
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

          <label className="flex gap-[5px]">
            Priority:
            <div className="relative flex group">
              <span className="text-blue-400 font-semibold">ⓘ</span>
              <div className="absolute hidden group-hover:block bg-[var(--background-hex)] w-[300px] border-2 p-4 whitespace-pre-wrap">
                {
                  "Product with higher priority is shown first.\nRange: 0-100.\nDefault value is 0."
                }
              </div>
            </div>
          </label>
          <input
            name="priority"
            value={formData.priority}
            className={inputcss}
            onChange={(prev) => {
              setFormData({
                ...formData,
                priority: parseInt(prev.target.value),
              });
            }}
          />

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
    </div>
  );
}
