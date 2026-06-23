const BASE_URL = import.meta.env.VITE_BASE_URL;

const getToken = () => localStorage.getItem("token");

// 🛒 Get cart
export const getCart = async () => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
};

// ➕ Add to cart
export const addToCart = async (product) => {
  const res = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ product }),
  });

  return res.json();
};

// 🔄 Update qty
export const updateCartQty = async (id, action) => {
  const res = await fetch(`${BASE_URL}/cart/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ action }),
  });

  return res.json();
};

// ❌ Remove item
export const removeFromCart = async (id) => {
  const res = await fetch(`${BASE_URL}/cart/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.json();
};