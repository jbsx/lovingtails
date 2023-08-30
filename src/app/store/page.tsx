import Product from "../components/Product";
import db from "../../../tempdb/db.json";
import { dbType } from "../utils";

export default function Store() {
  return (
    <div className="flex flex-col justify-center items-center m-5 p-5">
      <div className="container flex flex-wrap justify-center max-w-[2000px]">
        {db.Products.map((product: dbType) => {
          return <Product data={product} key={product.name} />;
        })}
      </div>
    </div>
  );
}
