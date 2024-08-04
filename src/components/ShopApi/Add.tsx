import { useState } from "react";
import { Product } from "./Form";
import { restApi } from "./Service";

type Props = {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export default function Add({ setProducts }: Props) {
  const [name, setName] = useState("");
  async function addHandle() {
    const newProduct = {
      title: name,
      price: 10000,
      description: "abc",
    };
    await restApi({ method: "POST", endpoint: "products", body: newProduct });
    const data = await restApi({
      endpoint: `products`,
      method: "GET",
    });
    setProducts(data);
    setName("");
  }

  return (
    <div className="flex justify-center items-center">
      <input
        className="w-[400px] h-[25px] border-2 border-blue-600 rounded p-3"
        type="text"
        placeholder="Add Product"
        id="productName"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="flex justify-center items-center w-12 h-12 bg-blue-500 rounded-full text-2xl text-center text-white"
        onClick={addHandle}
      >
        +
      </button>
    </div>
  );
}
