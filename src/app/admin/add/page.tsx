"use client";
import { useState } from "react";
import Msg from "../../components/Msg";
import { CustomUploader } from "../../components/CustomUploader";
import { useUploadThing } from "../../utils/uploadthing";
import { compressMany } from "../../utils/imgProcessing";
import Loading from "../../components/Loading";
import { UploadFileResponse } from "uploadthing/client";
import AdminDashboard from "@/app/components/AdminDashboard";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: 0,
    desc: "",
    tag: "",
    priority: 0,
    amznlink: "",
  });

  const [files, setFiles] = useState<Array<File | string>>([]);

  const [loading, setLoading] = useState(false);

  const [msg, setMsg] = useState<{ type: "S" | "E"; message: string } | null>(
    null,
  );

  //Custom Uploader
  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onUploadError: (e) => {
      setMsg({ type: "E", message: e.message });
      setLoading(false);
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    setMsg(null);

    try {
      //Data validation
      if (files.length === 0) {
        throw Error("Please Upload Image(s)");
      }

      //Uploadthing
      const smallFiles = await compressMany(files as File[]);

      const verify = new Promise((resolve, reject) => {
        if (smallFiles.length > 8) reject();

        smallFiles.forEach((i) => {
          if (i.size > 2_000_000) {
            reject("Image size too large. Size Limit: 2MB");
          }
        });

        resolve(true);
      });

      const uploadedImgs: UploadFileResponse[] = (await new Promise(
        async (resolve, reject) => {
          try {
            await verify;
            resolve((await startUpload(smallFiles)) as UploadFileResponse[]);
          } catch (e) {
            reject(e);
          }
        },
      )) as UploadFileResponse[];

      //POST to Pscale DB

      let imgs = "";
      uploadedImgs.forEach((i) => {
        imgs += `${i.key}|`;
      });
      imgs = imgs.slice(0, -1);

      const res = await fetch(process.env.URL + "/api/db/addProduct", {
        method: "POST",
        mode: "same-origin",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...formData, imgs }),
      });

      const data = await res.json();

      if (data.success) {
        setMsg({
          type: "S",
          message: "Product Added",
        });

        setFormData({
          title: "",
          price: 0,
          desc: "",
          tag: "",
          category: "",
          priority: 0,
          amznlink: "",
        });

        setFiles([]);
      } else {
        throw Error(data.message);
      }
    } catch (e) {
      if (e instanceof Error) {
        setMsg({ type: "E", message: e.message });
      }
    } finally {
      setLoading(false);
    }
    //TODO: Cleanup in case of an error
  };

  const inputcss = "min-h-[50px] mb-2 rounded outline-none p-[10px] text-base";

  return (
    <div className="flex flex-col m-auto items-center w-[600px] lg:w-full p-2">
      <AdminDashboard />

      <h1 className="text-3xl font-semibold text-[var(--accent-clr2)] w-full">
        Add Product
      </h1>

      {msg && <Msg type={msg.type} message={msg.message} />}
      <form
        className="flex flex-col w-full gap-[10px] text-lg"
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

        <label className="flex gap-[5px]">
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
          className={"h-[300px] mb-2 rounded outline-none p-[10px] text-base"}
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
            setFormData({ ...formData, priority: parseInt(prev.target.value) });
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
            "Add"
          )}
        </button>
      </form>
    </div>
  );
}
