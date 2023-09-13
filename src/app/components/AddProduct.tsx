"use client";
import { useState } from "react";
import Image from "next/image";
import "@uploadthing/react/styles.css";

import { UploadDropzone } from "../utils/uploadthing";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    tag: "",
    link: "",
  });

  const [images, setImages] = useState<Array<string>>([]);

  const handleSubmit = async () => {
    //ZOD validation
    //Upload images on Uploadthing
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
    console.log(res);
  };

  const inputcss = "min-h-[40px] rounded outline-none p-[10px] text-base";

  return (
    <div className="w-[600px] lg:w-full p-2">
      <h1 className="text-3xl font-semibold text-[var(--accent-clr2)]">
        Add Product
      </h1>
      <form
        className="flex flex-col w-full gap-[10px] text-lg"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label>
          Name:
          <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          value={formData.name}
          className={inputcss}
          onChange={(prev) => {
            setFormData({ ...formData, name: prev.target.value });
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
          onChange={(prev) => {
            setFormData({ ...formData, price: prev.target.value });
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
          value={formData.link}
          className={inputcss}
          onChange={(prev) => {
            setFormData({ ...formData, link: prev.target.value });
          }}
        ></input>

        <label>Images:</label>
        {images.map((i) => {
          return (
            <Image src={i} alt={`${i}`} width={150} height={150} key={i} />
          );
        })}
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            res?.forEach((i) => {
              setImages((imgs) => {
                return [...imgs, i.url];
              });
            });
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />

        <button
          className="cursor-pointer text-[var(--accent-clr2)] max-w-[200px] hover:bg-[var(--accent-clr2)]
                    hover:text-white p-4 uppercase text-xl font-semibold border-[4px] border-[var(--accent-clr2)]"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}
