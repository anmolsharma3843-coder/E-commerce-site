const BASE_URL = "http://localhost:5100/cart";

// 🛒 Get cart
export const getCart = async () => {
  const res = await fetch(BASE_URL, {
    credentials: "include",
  });
  return res.json();
};

// ➕ Add to cart
export const addToCart = async (product) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ product }),
  });
  return res.json();
};

// 🔄 Update qty
export const updateCartQty = async (id, action) => {
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ action }),
  });
  return res.json();
};

// ❌ Remove
export const removeFromCart = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
};