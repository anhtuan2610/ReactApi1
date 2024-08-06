import axios, { AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4444/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000, // nếu vượt quá timeout thì sẽ ngừng request (throw về error)
});

// interceptors : can thiệp / đánh chặn
// handle pre request (làm gì đó trước khi request được gửi)
// apiClient.interceptors.request.use(
//   (config) => {
//     //get token from local storage
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//     }

//     return config;
//   },
//   (error) => {
//     // xu ly error
//     return Promise.reject(error);
//   }
// );

// handle response (xử lý dữ liệu trả về)
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // // xử lý lỗi
    // // 400 401 403 404 500
    // if (error.response.status === 400) {
    //   // chuyển trang
    //   // window.location.replace("/404");
    //   window.location.replace("/login");
    // }
    return Promise.reject(error);
  }
);

// METHOD
// hàm get có kiểu trả về là 1 promise dạng T* (T có thể là kiểu Product)
export const get = <T,>({
  url,
  params,
  config, // một đối tượng chứa các tùy chọn khác liên quan đến yêu cầu.
}: {
  url: string;
  params?: AxiosRequestConfig["params"];
  config?: AxiosRequestConfig;
}): Promise<T> =>
  // tham số 1 là url , 2 là config
  apiClient.get(url, {
    url,
    params,
    ...config,
  });

export const post = ({
  url,
  data,
  config,
}: {
  url: string;
  data: unknown;
  config?: AxiosRequestConfig;
}) => apiClient.post(url, data, config);

export const update = ({
  url,
  data,
  config,
}: {
  url: string;
  data: unknown;
  config?: AxiosRequestConfig;
}) => apiClient.put(url, data, config);

export const remove = ({ url }: { url: string }) => apiClient.delete(url);
