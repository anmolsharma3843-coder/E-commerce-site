const BASE_URL = "http://localhost:5100/orders";

// ✅ Create Order
export const createOrder = async (data) => {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}` // add later if using auth
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create order");
  }

  return await res.json();
};

// ✅ Get All Orders (Admin)
export const getAllOrders = async () => {
  const res = await fetch(`${BASE_URL}`);

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return await res.json();
};

// ✅ Get Single Order
export const getOrderById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }

  return await res.json();
};
export const getMyOrders = async () => {
  try {
    const res = await fetch(`${BASE_URL}/myorders`, {
      method: "GET",
      credentials: "include"
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch orders");
    }

    return data;
  } catch (err) {
    throw err;
  }
};