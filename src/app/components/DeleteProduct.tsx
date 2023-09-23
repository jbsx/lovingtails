"use client";
import { useState } from "react";
import Msg from "./Msg";

export default function DeleteProduct() {
  const [msg, setMsg] = useState<{ type: "S" | "E"; message: string } | null>(
    null,
  );

  const [deleteTitle, setDeleteTitle] = useState("");

  const handleSubmit = async () => {
    //ZOD validation
    //Upload images on Uploadthing
    //POST on /api/db/addProduct
    const res = await fetch(process.env.URL + "/api/db/deleteProduct", {
      method: "POST",
      mode: "same-origin",
      cache: "no-store",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title: deleteTitle }),
    });
    const temp = await res.json();
    if (temp.success) {
      setMsg({
        type: "S",
        message: "Product Deleted",
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
          value={deleteTitle}
          className={inputcss}
          onChange={(e) => {
            setDeleteTitle(e.target.value);
          }}
        ></input>

        <button
          className="cursor-pointer text-[var(--accent-clr2)] max-w-[200px] hover:bg-[var(--accent-clr2)]
                    hover:text-white p-4 uppercase text-xl font-semibold border-[4px] border-[var(--accent-clr2)]"
          type="submit"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
