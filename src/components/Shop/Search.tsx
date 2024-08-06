import { useRef, useState } from "react";
import { Product } from "./Form";
import { getProducts } from "../../services/product-api";

type Props = {
  setProducts: (data: Product[]) => void;
};

export default function SearchProduct({ setProducts }: Props) {
  const [searchName, setSearchName] = useState<string>("");
  const timeoutId = useRef<number | null>(null);

  async function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchNameValue = event.target.value;
    setSearchName(searchNameValue); // không thể dùng searchName mà phải dùng searchNameValue vì lúc này mới set thì searchName chưa được thay đổi ngay mà phải đợi render lại thì lúc này searchName mới được cập nhật
    const querySearch =
      searchNameValue.length > 0 ? { title_like: searchNameValue } : {};

    if (timeoutId.current) {
      clearTimeout(timeoutId.current); // xóa timeout hiện tại và xuống dưới xét lại timeout chạy lại từ đầu
    }
    timeoutId.current = setTimeout(async () => {
      const data = await getProducts(querySearch);
      setProducts(data);
    }, 300);
  }

  return (
    <div className="w-3/5">
      <div className="flex">
        <input
          className="w-[595px] h-[25px] border-2 border-blue-600 rounded p-3"
          type="text"
          placeholder="Search"
          value={searchName}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}
