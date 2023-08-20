import Product from "../components/Product";
import db from "../../../tempdb/db.json";

interface dbType {
  name: string;
  price: number;
  tag?: string;
}

export default function Store() {
  return (
    <div className="flex flex-col justify-center items-center m-5 p-5">
      <div className="container flex flex-wrap justify-center">
        {db.Products.map((product: dbType) => {
          return <Product data={product} />;
        })}
      </div>
    </div>
  );
}
