import ReactDOM from "react-dom";

type Props = {
  isShow: boolean,
  setIsShow: (isShow: boolean) => void;
}

// Modal được render bên ngoài DOM gốc, ngay dưới dưới thẻ <body>.
// Modal được khai báo với z-10. Ngay cả khi một phần tử bên ngoài Modal được khai báo với z-20, Modal vẫn sẽ xuất hiện phía trên phần tử đó.
// Là do Modal được render sử dụng Portal, đặt nó cùng cấp với phần tử gốc trong DOM.
// Vì phần tử gốc không có z-index, nên Modal có thể được xuất hiện lên trên 
export default function Modal({isShow , setIsShow} : Props ) {
  return ReactDOM.createPortal(
    <div>
      {(isShow) ? (
        <div
          id="modal"
          className="fixed z-10 inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Modal Title</h2>
            <p className="mb-4">
              This is description modal react
            </p>
            <button
              onClick={() => {
                setIsShow(false);
              }}
              id="closeModal"
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>, document.getElementById("portal") as HTMLElement
  );
}
