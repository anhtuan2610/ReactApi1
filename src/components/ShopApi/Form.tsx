import { useEffect, useState } from "react";
import Add from "./Add";
import ListProduct from "./List";
import { restApi } from "./Service";
import SearchProduct from "./Search";

export type Product = {
  id?: number;
  title: string;
  price?: number;
  description?: string;
};

export default function Form() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await restApi({ method: "GET", endpoint: "products" });
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, [setProducts]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center w-2/5 h-5/6 border-2 border-blue-600">
        <div className="text-2xl font-bold pt-6">Demo Api</div>

        {/* Search */}
        <div>
          <SearchProduct setProducts={setProducts}/>
        </div>

        {/* List -> Item (edit, delete) */}
        <div className="py-4">
          <ListProduct products={products} setProducts={setProducts} />
        </div>

        {/* Add */}
        <div>
          <Add setProducts={setProducts} />
        </div>
      </div>
    </div>
  );
}
