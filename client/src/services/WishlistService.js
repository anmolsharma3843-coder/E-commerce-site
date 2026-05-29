const BASE_URL = import.meta.env.VITE_BASE_URL;

// ✅ Get Wishlist
export const getWishlist = async () => {
  try {
    const res = await fetch(`${BASE_URL}/wishlist`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch wishlist");

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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) throw new Error("Failed to update wishlist");

    return await res.json();
  } catch (err) {
    console.error("Wishlist Toggle Error:", err);
    return [];
  }
};