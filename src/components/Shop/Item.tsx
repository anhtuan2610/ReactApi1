import { useState } from "react";
import { Product } from "./Form";
import { deleteProduct, editProduct, getProducts } from "../../services/product-api";

type Props = {
  products: Product[];
  setProducts: (data: Product[]) => void;
};

type TProductUpdate = Omit<Product, "id" | "description">;

export default function Item({ products, setProducts }: Props) {
  const [isShow, setIsShow] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");

  function handlePopUp(isDisplay: boolean, productId?: number) {
    setIsShow(isDisplay); // phải render lại tận 2 lần thì mới hiện ra popup (không hiểu thì đọc code)
    if (isDisplay && productId) {
      setCurrentProductId(productId);
      const productName = products.find((p) => p.id === productId)?.title || "";
      setEditName(productName);
    } else {
      console.log("productId: null");
    }
  }

  async function handleEdit() {
    if (currentProductId) {
      const updateProduct : TProductUpdate = {
        title: editName,
        price: 1234
      };
      await editProduct(currentProductId, updateProduct);

      const data = await getProducts();
      setProducts(data);
      setEditName("");
      handlePopUp(false);
    }
  }

  async function handleDelete(id?: number) {
    if (id) {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id)); // filter => true: được chọn false: loại
    }
  }

  return (
    <div>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex justify-center items-center gap-2 py-1"
        >
          {product.title}
          <div>
            <button
              id="edit"
              onClick={() => handlePopUp(true, product.id)}
              className="rounded-full border border-black w-6 h-6 bg-blue-600 text-white"
            >
              i
            </button>
          </div>
          <div>
            <button
              onClick={() => handleDelete(product.id)}
              className="rounded-full border border-black w-6 h-6 bg-blue-600 text-white"
            >
              -
            </button>
          </div>
        </div>
      ))}
      {isShow ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold">Edit Product</h2>
            <input
              value={editName}
              onChange={(e) => {
                setEditName(e.target.value);
              }}
              type="text"
              className="mt-2 p-2 border rounded w-full"
            />
            <button
              onClick={handleEdit}
              className="mt-2 p-2 bg-green-500 text-white rounded"
            >
              Edit
            </button>
            <button
              className="mt-2 p-2 bg-red-500 text-white rounded"
              onClick={() => handlePopUp(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
