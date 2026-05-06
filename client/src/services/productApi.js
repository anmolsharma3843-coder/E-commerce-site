// src/services/productApi.js

export const addProductApi = async (product) => {
  try {
    const response = await fetch("http://localhost:5100/products", {
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
