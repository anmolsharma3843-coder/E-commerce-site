import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWishlist, toggleWishlist } from "../services/WishlistService";
import { ImCancelCircle } from "react-icons/im";

const Wishlist = () => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);


  // ✅ Fetch Wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {

        const data = await getWishlist();
        setWishlist(data);
      } catch (err) {
        console.log("Error fetching wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // ✅ Remove / Toggle Item
  const removeItem = async (id, e) => {
    e.stopPropagation();

    try {
      const updated = await toggleWishlist(id);
      setWishlist(updated);
    } catch (err) {
      console.log("Error removing item:", err);
    }
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500 text-xl">
        Loading wishlist...
      </div>
    );
  }

  // ✅ Empty State
 if (wishlist.length === 0) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-700 text-xl dark:bg-gray-950 dark:text-gray-300">
      <div className="text-5xl mb-4">💔</div>
      <p>Your wishlist is empty</p>
    </div>
  );
}

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10 px-4 md:px-10">
      
      {/* HEADER */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        ❤️ Your Wishlist
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">

        {wishlist.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/product/${item._id}`)}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md md:hover:shadow-xl transition cursor-pointer overflow-hidden group"
          >

            {/* IMAGE */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-contain md:group-hover:scale-110 transition duration-500"
              />

              {/* REMOVE BUTTON */}
              <button
                onClick={(e) => removeItem(item._id, e)}
                className="absolute top-2 right-2  text-xs px-3 py-1 rounded-full shadow  text-red-500 "
                 aria-label="Remove item"
              >
              <ImCancelCircle size={25}/>
              </button>
            </div>

            {/* DETAILS */}
            <div className="p-3 space-y-1">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 line-clamp-2">
                {item.title}
              </h3>

              <p className="text-lg font-bold text-gray-900 dark:text-white">
                ₹{Math.round(item.price)}
              </p>

              <p className="text-xs text-green-600">
                Free Delivery
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Wishlist;