const BASE_URL = import.meta.env.VITE_BASE_URL;

const getToken = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return user?.token;
};

// ✅ Get Wishlist
export const getWishlist = async () => {
  try {
    const res = await fetch(`${BASE_URL}/wishlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch wishlist");
    }

    return await res.json();
  } catch (err) {
    console.error("Wishlist Fetch Error:", err);
    return [];
  }
};

// ✅ Toggle Wishlist
export const toggleWishlist = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) {
      throw new Error("Failed to update wishlist");
    }

    return await res.json();
  } catch (err) {
    console.error("Wishlist Toggle Error:", err);
    return [];
  }
};