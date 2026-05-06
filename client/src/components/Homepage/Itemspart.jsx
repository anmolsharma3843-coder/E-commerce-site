import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { products } from "../../services/ApiService";
import { getWishlist, toggleWishlist } from "../../services/WishlistService";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ProductSkeleton from "../Skeleton/ProductSkeleton";

const Itemspart = () => {
  const navigate = useNavigate();
  const { term, results } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);


  // ✅ Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await products();
        setItems(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Fetch Wishlist from Backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {

        const data = await getWishlist();
        setWishlist(data);
      } catch (err) {
        console.log("Wishlist fetch error:", err);
      }
    };

    fetchWishlist();
  }, []);

  // ✅ Toggle Wishlist (Backend)
  const handleWishlist = async (id, e) => {
    e.stopPropagation();

    try {

      const updated = await toggleWishlist(id);
      setWishlist(updated);
    } catch (err) {
      console.log("Wishlist toggle error:", err);
    }
  };

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  // ✅ Loading UI
  if (loading) {
    return (
      <section className="bg-gray-50 dark:bg-gray-900 py-10 px-4 md:px-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Trending Products
        </h2>

        <div className="flex gap-6 overflow-x-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  // ✅ No Search Result
  if (term && results.length === 0) {
    return (
      <p className="text-center text-2xl font-semibold my-20 text-gray-600">
        No products found
      </p>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-10 px-4 md:px-10">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Trending Products
        </h2>

        <button className="text-sm text-indigo-600 hover:underline">
          View All
        </button>
      </div>

      {/* PRODUCTS */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
        {items.map((item) => {
          const isWishlisted = wishlist.some(
            (i) => i._id === item._id
          );

          return (
            <div
              key={item._id}
              onClick={() => handleClick(item._id)}
              className="min-w-50 max-w-60 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
            >
              {/* IMAGE */}
              <div className="relative h-45 sm:h-50 md:h-60 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

                {/* ❤️ WISHLIST BUTTON */}
                <button
  onClick={(e) => handleWishlist(item._id, e)}
  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
  className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition
  ${
    isWishlisted
      ? "bg-red-600 text-white scale-110"
      : "bg-white text-gray-800 hover:bg-red-100"
  }`}
>
                  {isWishlisted ? (
                    <FaHeart size={14} />
                  ) : (
                    <FaRegHeart size={14} />
                  )}
                </button>
              </div>

              {/* DETAILS */}
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-green-700 text-white px-2 py-0.5 rounded text-xs">
                    {item.rating || 4.2} ★
                  </span>
                  <span className="text-gray-500">(1.2k)</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-600 line-through">
                    ₹{Math.round(item.price)}
                  </span>
                  <span className="text-sm text-gray-600 line-through">
                    ₹{item.price + 500}
                  </span>
                </div>

                <p className="text-xs text-green-700 dark:text-green-400 font-medium">
                  Free Delivery
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Itemspart;