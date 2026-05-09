import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../../services/ApiService";
import {
  getWishlist,
  toggleWishlist,
} from "../../services/WishlistService";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ProductSkeleton from "../Skeleton/ProductSkeleton";

const Itemspart = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState("");

  // ✅ Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await products();

        setItems(data);
      } catch (err) {
        console.log(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Fetch Wishlist
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

  // ✅ Fast Wishlist Lookup
  const wishlistIds = useMemo(() => {
    return new Set(wishlist.map((i) => i._id));
  }, [wishlist]);

  // ✅ Navigate Product Page
  const handleClick = useCallback(
    (id) => {
      navigate(`/product/${id}`);
    },
    [navigate]
  );

  // ✅ Optimistic Wishlist Update
  const handleWishlist = useCallback(
    async (id, e) => {
      e.stopPropagation();

      const previousWishlist = wishlist;

      const exists = wishlist.some(
        (item) => item._id === id
      );

      if (exists) {
        setWishlist((prev) =>
          prev.filter((item) => item._id !== id)
        );
      } else {
        setWishlist((prev) => [
          ...prev,
          { _id: id },
        ]);
      }

      try {
        const updated = await toggleWishlist(id);
        setWishlist(updated);
      } catch (err) {
        console.log("Wishlist toggle error:", err);

        // rollback if API fails
        setWishlist(previousWishlist);
      }
    },
    [wishlist]
  );

  // ✅ Loading UI
  if (loading) {
    return (
      <section className="bg-gray-50 dark:bg-gray-900 py-10 px-4 md:px-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-52 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2" />
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  // ✅ Error State
  if (error) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-red-500 text-xl font-semibold">
          {error}
        </h2>
      </div>
    );
  }

  // ✅ Empty Products
  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          No Products Available
        </h2>

        <p className="text-gray-500 mt-2">
          Please check again later
        </p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-10 px-4 md:px-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Trending Products
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Discover the latest fashion trends
          </p>
        </div>

        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition hover:cursor-pointer" onClick={()=>navigate("/shop")}>
          View All
        </button>
      </div>

      {/* PRODUCTS */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-3">
        {items.map((item) => {
          const isWishlisted =
            wishlistIds.has(item._id);

          const originalPrice = item.price + 500;

          const discount = Math.round(
            ((originalPrice - item.price) /
              originalPrice) *
              100
          );

          return (
            <div
              key={item._id}
              onClick={() => handleClick(item._id)}
              role="button"
              tabIndex={0}
              className="min-w-55 max-w-55 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              {/* IMAGE */}
              <div className="relative h-60 overflow-hidden">
                <img
                  loading="lazy"
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

                {/* ❤️ WISHLIST */}
                <button
                  onClick={(e) =>
                    handleWishlist(item._id, e)
                  }
                  aria-label={
                    isWishlisted
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-300
                    ${
                      isWishlisted
                        ? "bg-red-600 text-white scale-110"
                        : "bg-white text-gray-800 hover:bg-red-100"
                    }`}
                >
                  {isWishlisted ? (
                    <FaHeart size={15} />
                  ) : (
                    <FaRegHeart size={15} />
                  )}
                </button>

                {/* DISCOUNT BADGE */}
                <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  {discount}% OFF
                </div>
              </div>

              {/* DETAILS */}
              <div className="p-4 space-y-3">
                {/* TITLE */}
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 line-clamp-2 min-h-10">
                  {item.title}
                </h3>

                {/* RATING */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-green-700 text-white px-2 py-1 rounded">
                    {item.rating || 4.2} ★
                  </span>

                  <span className="text-gray-500">
                    (1.2k Reviews)
                  </span>
                </div>

                {/* PRICE */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ₹{Math.round(item.price)}
                  </span>

                  <span className="text-sm text-gray-500 line-through">
                    ₹{originalPrice}
                  </span>
                </div>

                {/* DELIVERY */}
                <p className="text-xs font-medium text-green-700 dark:text-green-400">
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