"use client";
import { useState } from "react";
import Msg from "./Msg";
import { CustomUploader } from "./CustomUploader";
import { useUploadThing } from "../utils/uploadthing";
import { compressMany } from "../utils/imgProcessing";
import Loading from "./Loading";
import { UploadFileResponse } from "uploadthing/client";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: 0,
    desc: "",
    tag: "",
    amznlink: "",
  });

  const [files, setFiles] = useState<File[]>([]);

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

    //Data validation
    if (files.length === 0) {
      setMsg({ type: "E", message: "Please Upload Image(s)" });
      return;
    }

    //Uploadthing
    const smallFiles = await compressMany(files);

    const verify = new Promise((resolve, reject) => {
      if (smallFiles.length > 8) reject();

      smallFiles.forEach((i) => {
        if (i.size >= 2_000_000) {
          reject("Image size too large. Size Limit: 2MB");
        }
      });

      resolve(true);
    }).catch((e) => {
      setMsg({ type: "E", message: e.message });
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
    ).catch((e) => {
      setMsg({ type: "E", message: e.message });
    })) as UploadFileResponse[];

    //POST to Pscale DB

    let imgs = "";
    uploadedImgs.forEach((i) => {
      imgs += `${i.key}|`;
    });
    imgs = imgs.slice(0, -1);

    const res = await fetch("http://localhost:3000/api/db/addProduct", {
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
        amznlink: "",
      });
    } else {
      setMsg({ type: "E", message: data.message });
    }

    //TODO: Cleanup in case of an error
    setLoading(false);
  };

  const inputcss = "min-h-[50px] mb-2 rounded outline-none p-[10px] text-base";

  return (
    <div className="w-[600px] lg:w-full p-2">
      <h1 className="text-3xl font-semibold text-[var(--accent-clr2)]">
        Add Product
      </h1>
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
        ></input>

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
        ></input>

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
        ></input>

        <label>Tag:</label>
        <input
          name="tag"
          value={formData.tag}
          className={inputcss}
          onChange={(prev) => {
            setFormData({ ...formData, tag: prev.target.value });
          }}
        ></input>

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
        ></input>

        <label>Image(s):</label>
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
          Add
        </button>
      </form>
      <div className="w-full h-[50px]">{loading && <Loading />}</div>
    </div>
  );
}
