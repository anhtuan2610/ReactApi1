import { useState } from "react";
import { Product } from "./Form";
import { restApi } from "./Service";

type Props = {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export default function SearchProduct({ setProducts }: Props) {
  const [searchName, setSearchName] = useState<string>("");
  async function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchNameValue = event.target.value; 
    setSearchName(searchNameValue); // không thể dùng searchName mà phải dùng searchNameValue vì lúc này mới set thì searchName chưa được thay đổi ngay mà phải đợi render lại thì lúc này searchName mới được cập nhật
    const querySearch =
      searchNameValue.length > 0
        ? `products?title_like=${searchNameValue}`
        : `products`;
    const data = await restApi({
      method: "GET",
      endpoint: querySearch,
    });
    setProducts(data);
  }
  return (
    <div>
      <div className="flex pt-3">
        <input
          className="w-[595px] h-[25px] border-2 border-blue-600 rounded p-3"
          type="text"
          placeholder="Search"
          value={searchName}
          onChange={(e) => {
            handleSearch(e);
          }}
        />
      </div>
    </div>
  );
}
