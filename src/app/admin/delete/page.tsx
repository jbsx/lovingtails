"use client";
import AdminDashboard from "@/app/components/AdminDashboard";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteProduct() {
  const [deleteTitle, setDeleteTitle] = useState("");

  const handleSubmit = async () => {
    //TODO: Delete images from Uploadthing

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

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        toast.success("Product Deleted");
      } else {
        toast.error("Error. Try again later.");
      }
    } else {
      toast.error("Error. Try again later.");
    }
  };

  const inputcss = "min-h-[40px] rounded outline-none p-[10px] text-base";

  return (
    <div className="flex flex-col items-center py-2">
      <AdminDashboard />
      <ToastContainer position="bottom-right" autoClose={10_000} />
      <div className="w-[600px] lg:w-full p-2">
        <h1 className="text-3xl font-semibold text-[var(--accent-clr2)]">
          Delete Product
        </h1>
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
    </div>
  );
}
