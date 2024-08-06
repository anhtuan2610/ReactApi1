export type ApiQuery<T> = {
  endpoint: string;
  method: string;
  body?: T;
};

export async function restApi<T>({ endpoint, method, body }: ApiQuery<T>) {
  try {
    const res = await fetch(`http://localhost:4444/api/${endpoint}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// export function getQueryString(params) {
//   let queryString = "";

//   Object.keys(params).forEach((key) => {
//     if (params[key]) {
//       queryString += `${key}=${params[key]}&`;
//     }
//   });
//   return queryString;
// }