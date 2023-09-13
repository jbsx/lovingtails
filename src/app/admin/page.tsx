import AddProduct from "../components/AddProduct";

export default function admin() {
  return (
    <div className="flex flex-col gap-[10px] items-center">
      <div className="flex gap-[5px] w-[1000px] m-2 lg:w-full text-center">
        <div className="w-full p-[10px] border hover:bg-[var(--accent-clr2)] cursor-pointer">
          Add Product
        </div>
        <div className="w-full p-[10px] border hover:bg-[var(--accent-clr2)] cursor-pointer">
          Update Product
        </div>
        <div className="w-full p-[10px] border hover:bg-[var(--accent-clr2)] cursor-pointer">
          Delete Product
        </div>
      </div>
      <AddProduct />
    </div>
  );
}
