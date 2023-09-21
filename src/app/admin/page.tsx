"use client";
import AddProduct from "../components/AddProduct";
import { useState } from "react";
import UpdateProduct from "../components/UpdateProduct";
import DeleteProduct from "../components/DeleteProduct";

export default function Admin() {
  const [curr, setCurr] = useState("Add");

  return (
    <div className="flex flex-col items-center my-5">
      <div className="flex flex-wrap justify-center gap-[5px] w-[1000px] lg:w-full text-center select-none">
        <div
          className={`p-[10px] border hover:bg-[var(--accent-clr2)] cursor-pointer ${
            curr === "Add" ? "bg-[var(--accent-clr2)] text-white" : ""
          }`}
          onClick={() => setCurr("Add")}
        >
          Add Product
        </div>
        <div
          className={`p-[10px] border hover:bg-[var(--accent-clr2)] cursor-pointer ${
            curr === "Update" ? "bg-[var(--accent-clr2)] text-white" : ""
          }`}
          onClick={() => setCurr("Update")}
        >
          Update Product
        </div>
        <div
          className={`p-[10px] border hover:bg-[var(--accent-clr2)] cursor-pointer ${
            curr === "Delete" ? "bg-[var(--accent-clr2)] text-white" : ""
          }`}
          onClick={() => setCurr("Delete")}
        >
          Delete Product
        </div>
      </div>
      {curr === "Add" && <AddProduct />}
      {curr === "Update" && <UpdateProduct />}
      {curr === "Delete" && <DeleteProduct />}
    </div>
  );
}
