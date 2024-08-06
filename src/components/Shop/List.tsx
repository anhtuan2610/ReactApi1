import Item from "./Item";
import { Product } from "./Form";

type Props = {
  products: Product[];
  setProducts: (data: Product[]) => void;
};

export default function ListProduct({ products, setProducts }: Props) {
  return (
    <div className="relative">
      <Item products={products} setProducts={setProducts} />
    </div>
  );
}
