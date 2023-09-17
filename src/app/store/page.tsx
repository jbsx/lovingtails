import Product from "../components/Product";
import db from "../../../tempdb/db.json";
import { dbType } from "../utils";

export default async function Store() {
  const res = await fetch("http://localhost:3000/api/db/getProducts");
  const data = await res.json();
  console.log(data.products);

  return (
    <div className="flex flex-col justify-center items-center m-5 p-5">
      <div className="container flex flex-wrap justify-center max-w-[2000px] gap-[2px]">
        {db.Products.map((product: dbType) => {
          return <Product data={product} key={product.name} />;
        })}
      </div>
    </div>
  );
}
