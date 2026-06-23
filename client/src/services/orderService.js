const BASE_URL = import.meta.env.VITE_BASE_URL;

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

// ✅ Create Order
export const createOrder = async (data) => {
  const res = await fetch(`${BASE_URL}/orders/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
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
  const res = await fetch(`${BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return await res.json();
};

// ✅ Get Single Order
export const getOrderById = async (id) => {
  const res = await fetch(`${BASE_URL}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }

  return await res.json();
};

// ✅ Get My Orders
export const getMyOrders = async () => {
  try {
    const res = await fetch(`${BASE_URL}/orders/myorders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
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

// ✅ Update Order Status
export const updateOrderStatus = async (id, status) => {
  const res = await fetch(
    `${BASE_URL}/orders/update-status/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update order");
  }

  return await res.json();
};

// ✅ Total Revenue
export const getTotalRevenue = async () => {
  try {
    const res = await fetch(`${BASE_URL}/orders/sales`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch revenue");
    }

    return data;
  } catch (err) {
    throw err;
  }
};