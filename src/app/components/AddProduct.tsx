"use client";
import { useState } from "react";
import ImageReorder from "./ImageReorder";
import Msg from "./Msg";
import { dataSchema } from "../utils/zodTypes";
import { z } from "zod";
import Compressor from "compressorjs";

export default function AddProduct() {
  const [formData, setFormData] = useState<z.infer<typeof dataSchema>>({
    title: "",
    price: 0,
    desc: "",
    tag: "",
    amznlink: "",
  });

  const [images, setImages] = useState<Array<File>>([]);

  const [msg, setMsg] = useState<{ type: "S" | "E"; message: string } | null>(
    null,
  );

  const handleSubmit = async () => {
    //ZOD validation
    //Upload images on Uploadthing
    fetch("http://localhost:3000/api/db/uploadImages", {
      method: "POST",
      mode: "same-origin",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(images),
    });

    //POST on /api/db/addProduct
    const res = await fetch("http://localhost:3000/api/db/addProduct", {
      method: "POST",
      mode: "same-origin",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
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
        amznlink: "",
      });
    } else {
      setMsg({ type: "E", message: data.message });
    }
  };

  const inputcss = "min-h-[40px] rounded outline-none p-[10px] text-base";

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

        <label>Images (upto 8):</label>
        <ImageReorder files={images} setFiles={setImages} />
        <input
          type="file"
          multiple
          onChange={(e) => {
            setImages((data) => {
              if (e.target.files) {
                return [...data, ...e.target.files];
              } else {
                //dont change
                return data;
              }
            });
          }}
        ></input>

        <button
          type="button"
          onClick={() => {
            const body = new FormData();

            const compressPromises = images.map((i) => {
              return new Promise((resolve, reject) => {
                new Compressor(i, {
                  quality: 0.4,
                  success(smallImg) {
                    resolve(structuredClone(smallImg) as File);
                  },
                  error(e) {
                    reject(e);
                  },
                });
              });
            });

            Promise.all(compressPromises)
              .then((compressedImages) => {
                compressedImages.forEach((i, idx) => {
                  body.append(`${idx}`, i as File, `${idx}`);
                });
                fetch("http://localhost:3000/api/db/uploadImages", {
                  method: "POST",
                  mode: "same-origin",
                  cache: "no-cache",
                  credentials: "same-origin",
                  body,
                });
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        >
          upload
        </button>

        <button
          className="cursor-pointer text-[var(--accent-clr2)] max-w-[200px] hover:bg-[var(--accent-clr2)]
                    hover:text-white p-4 uppercase text-xl font-semibold border-[4px] border-[var(--accent-clr2)]
                    outline-none"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}
