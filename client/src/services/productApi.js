const BASE_URL = import.meta.env.VITE_BASE_URL;

const getToken = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return user?.token;
};

// ADD PRODUCT (Admin)
export const addProductApi = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error: ${response.status}`);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

// FETCH PRODUCT LIST
export const fetchProductList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log("API call Failed", error);
    throw error;
  }
};

// GET ALL PRODUCTS
export const fetchAllproduct = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log("API call Failed", error);
    throw error;
  }
};

// DELETE PRODUCT (Admin)
export const deleteProductApi = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};

// FILTER PRODUCTS
export const getProducts = async (filters) => {
  try {
    const query = new URLSearchParams(filters).toString();

    const res = await fetch(`${BASE_URL}/products?${query}`);

    return await res.json();
  } catch (error) {
    console.log("API call Failed", error);
    throw error;
  }
};

// UPDATE PRODUCT (Admin)
export const updateProduct = async (id, formData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/products/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update product");
    }

    return data;
  } catch (error) {
    console.log("API call Failed", error);
    throw error;
  }
};

// PRODUCT DETAILS
export const getProductDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log("API call Failed", error);
    throw error;
  }
};

// RELATED PRODUCTS
export const getrelatedProduct = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/products/category/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log("API call Failed", error);
    throw error;
  }
};