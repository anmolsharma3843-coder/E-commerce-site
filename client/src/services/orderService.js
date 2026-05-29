const BASE_URL = import.meta.env.VITE_BASE_URL;

// ✅ Create Order
export const createOrder = async (data) => {
  const res = await fetch(`${BASE_URL}/orders/create`, {
    method: "POST",
    credentials:'include',
    headers: {
      "Content-Type": "application/json",
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
  const res = await fetch(`${BASE_URL}/orders`);

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return await res.json();
};

// ✅ Get Single Order
export const getOrderById = async (id) => {
  const res = await fetch(`${BASE_URL}/orders/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }

  return await res.json();
};
export const getMyOrders = async () => {
  try {
    const res = await fetch(`${BASE_URL}/orders/myorders`, {
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
//update status of the order
export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/orders/update-status/${id}`,
    {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return await res.json();
};