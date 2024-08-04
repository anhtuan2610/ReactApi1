import { Product } from "./Form";

export type ApiQuery = {
  endpoint: string;
  method: string;
  body?: Product;
};

export async function restApi({ endpoint, method, body }: ApiQuery) {
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
    throw error;
  }
}