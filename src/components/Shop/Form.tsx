import { useEffect, useState } from "react";
import Add from "./Add";
import ListProduct from "./List";
import SearchProduct from "./Search";
import { getProducts } from "../../services/product-api";
import Modal from "./Modal";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
};

export default function Form() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="flex z-20 justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center w-2/5 h-5/6 border-2 border-blue-600">
        <div className="text-2xl font-bold pt-6">Demo Api</div>

        {/* Search */}
        <div className="flex justify-center items-center pt-3">
          <SearchProduct setProducts={setProducts} />
        </div>

        {/* List -> Item (edit, delete) */}
        <div className="py-4">
          <ListProduct products={products} setProducts={setProducts} />
        </div>

        {/* Add */}
        <div>
          <Add setProducts={setProducts} />
        </div>

        {/* Modal */}
        <div>
          <button
            onClick={() => {
              setIsShow(true);
            }}
            id="openModal"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Open Modal
          </button>
          <Modal isShow={isShow} setIsShow={setIsShow} />
        </div>
      </div>
    </div>
  );
}
