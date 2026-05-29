// src/services/productApi.js
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const addProductApi = async (product) => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify({
        ...product,
        price: Number(product.price),
        rating: Number(product.rating),
        sizes: product.sizes.split(",").map(s => s.trim())
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error:${response.status}`);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
