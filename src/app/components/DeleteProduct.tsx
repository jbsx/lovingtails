"use client";
import { useState } from "react";
import Image from "next/image";
import Msg from "./Msg";

export default function DeleteProduct() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    desc: "",
    tag: "",
    amznlink: "",
    images: Array<File>(8),
  });

  const [msg, setMsg] = useState<{ type: "S" | "E"; message: string } | null>(
    null,
  );

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
    const temp = await res.json();
    if (temp.success) {
      setMsg({
        type: "S",
        message: "Product Added",
      });
      setFormData({
        title: "",
        price: "",
        desc: "",
        tag: "",
        amznlink: "",
        images: [],
      });
    }
  };

  const inputcss = "min-h-[40px] rounded outline-none p-[10px] text-base";

  return (
    <div className="w-[600px] lg:w-full p-2">
      <h1 className="text-3xl font-semibold text-[var(--accent-clr2)]">
        Delete Product
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
          value={formData.amznlink}
          className={inputcss}
          onChange={(prev) => {
            setFormData({ ...formData, amznlink: prev.target.value });
          }}
        ></input>

        <label>Images (upto 8):</label>
        <input
          type="file"
          multiple
          onChange={(e) => {
            setFormData((data) => {
              if (e.target.files && e.target.files[0]) {
                return { ...data, images: [...data.images, e.target.files[0]] };
              } else {
                //dont change
                return data;
              }
            });
          }}
        ></input>
        <div className="flex flex-wrap gap-[10px]">
          {formData.images.map((i) => {
            console.log(i);
            return (
              <Image
                src={URL.createObjectURL(i)}
                alt={`${i}`}
                width={150}
                height={150}
                key={i.name}
              />
            );
          })}
        </div>

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
