import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../services/ApiService";
import { addToCart } from "../services/Cartitems";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { getWishlist, toggleWishlist } from "../services/WishlistService";
import CategorySkeleton from "../components/Skeleton/CategorySkeleton";
import { cartActions } from "../store/cartSlice";
import { useDispatch } from "react-redux";

const CategoryItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const token = Cookies.get("jwt");
  const dispatch = useDispatch();

  const { category } = useParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category,
    sort: "",
    minPrice: "",
    maxPrice: "",
    page: 1,
  });

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();
        setWishlist(data);
      } catch (err) {
        console.log("Wishlist fetch error:", err);
      }
    };

    if (token) {
      fetchWishlist();
    }
  }, [token]);

  // ✅ ACCESSIBLE + BETTER CONTRAST
  useEffect(() => {
    document.body.classList.add("bg-gray-100", "dark:bg-gray-900");
  }, []);

  // ✅ Toggle Wishlist
  const handleWishlist = async (id, e) => {
    e.stopPropagation();

    try {
      const updated = await toggleWishlist(id);
      setWishlist(updated);
    } catch (err) {
      console.log("Wishlist toggle error:", err);
    }
  };

  // ✅ FETCH PRODUCTS
  const fetchItems = async (currentFilters) => {
    setLoading(true);

    try {
      const data = await getProducts(currentFilters);

      setItems(data.products || []);
      setTotalPages(data.pages || 1);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATE CATEGORY
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category,
      page: 1,
    }));
  }, [category]);

  // ✅ FETCH WHEN FILTER CHANGES
  useEffect(() => {
    fetchItems(filters);
  }, [
    filters.category,
    filters.sort,
    filters.minPrice,
    filters.maxPrice,
    filters.page,
  ]);

  // ✅ SORT
  const handleSort = (value) => {
    setFilters((prev) => ({
      ...prev,
      sort: value,
      page: 1,
    }));
  };

  // ✅ PRICE FILTER
  const handlePrice = (min, max) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
      page: 1,
    }));
  };

  // ✅ ADD TO CART
  const AddToCart = async (item) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      dispatch(cartActions.addItem(item));

      const response = await addToCart(item);

      if (response.message === "Item already in cart") {
        toast.success("Already in cart");
      } else {
        toast.success("Added to cart");
      }
    } catch (error) {
      console.log("fetching error", error);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* HEADER */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-8 py-4 shadow-sm flex flex-col md:flex-row justify-between gap-4">

        <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
          {category}
        </h1>

        {/* SORT */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="text-sm font-medium text-gray-800 dark:text-gray-200"
          >
            Sort Products:
          </label>

          <select
            id="sort"
            onChange={(e) => handleSort(e.target.value)}
            className="
              border border-gray-300 dark:border-gray-600
              rounded-lg px-3 py-2 text-sm
              bg-white dark:bg-gray-700
              text-gray-900 dark:text-white
              focus:outline-none
              focus:ring-2 focus:ring-purple-500
            "
          >
            <option value="">Relevance</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* SIDEBAR */}
        <aside className="hidden lg:block col-span-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 h-fit sticky top-20 shadow-sm">

          <h2 className="text-lg mb-5 text-gray-900 dark:text-white font-bold">
            Filters
          </h2>

          <div className="space-y-3 text-sm">

            <button
              onClick={() => handlePrice(0, 500)}
              className="
                block w-full text-left px-3 py-2 rounded-lg
                text-gray-800 dark:text-gray-200
                hover:bg-purple-50 dark:hover:bg-gray-700
                hover:text-purple-700 dark:hover:text-purple-400
                transition
              "
            >
              Under ₹500
            </button>

            <button onClick={() => handlePrice(500, 1000)} className=" block w-full text-left px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-700 dark:hover:text-purple-400 transition " >
              ₹500 - ₹1000
            </button>

            <button
              onClick={() => handlePrice(1000, 5000)}
              className="
                block w-full text-left px-3 py-2 rounded-lg
                text-gray-800 dark:text-gray-200
                hover:bg-purple-50 dark:hover:bg-gray-700
                hover:text-purple-700 dark:hover:text-purple-400
                transition
              "
            >
              ₹1000 - ₹5000
            </button>
          </div>
        </aside>

        {/* PRODUCTS */}
        <div className="col-span-4">

          {loading ? (
            <CategorySkeleton />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

              {items.map((item) => {
                const isWishlisted = wishlist.some(
                  (i) => i._id === item._id
                );

                return (
                  <div
                    key={item._id}
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="
                      group
                      bg-white dark:bg-gray-800
                      border border-gray-200 dark:border-gray-700
                      rounded-2xl overflow-hidden
                      shadow-sm hover:shadow-xl
                      transition-all duration-300
                      cursor-pointer flex flex-col h-full
                    "
                  >

                    {/* IMAGE */}
                    <div className="relative h-52 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">

                      <img src={item.imageUrl} alt={item.title} loading="lazy" width="300" height="300" className=" max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300 " />

                      {/* WISHLIST */}
                      <button
                        onClick={(e) => handleWishlist(item._id, e)}
                        aria-label="Wishlist"
                        className={`
                          absolute top-3 right-3 p-2 rounded-full shadow-md transition
                          ${
                            isWishlisted
                              ? "bg-red-500 text-white scale-110"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-red-100"
                          }
                        `}
                      >
                        {isWishlisted ? (
                          <FaHeart size={14} />
                        ) : (
                          <FaRegHeart size={14} />
                        )}
                      </button>
                    </div>

                    {/* DETAILS */}
                    <div className="p-4 flex flex-col flex-1">

                      <p className="text-sm text-gray-900 dark:text-gray-100 line-clamp-2 min-h-10">
                        {item.title}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="bg-green-700 text-white text-xs px-2 py-1 rounded">
                          {item.rating || 4.2} ★
                        </span>
                      </div>

                      <div className="mt-3">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ₹{item.price}
                        </span>

                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                          ₹{item.price + 500}
                        </span>
                      </div>

                      {/* BUTTON */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          AddToCart(item);
                        }}
                        className=" mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2.5 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-500 " >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-4 mt-12 flex-wrap">

            {/* PREV */}
            <button
              disabled={filters.page === 1}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: prev.page - 1,
                }))
              }
              className=" px-5 py-2.5 rounded-xl font-medium transition-all duration-200 bg-white text-gray-900 border border-gray-300 shadow-sm hover:bg-gray-100 hover:shadow dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed " >
              ← Prev
            </button>

            {/* PAGE */}
            <div className=" px-5 py-2.5 rounded-xl font-semibold shadow-sm bg-linear-to-r from-purple-700 to-indigo-700 text-white " >
              Page {filters.page} of {totalPages}
            </div>

            {/* NEXT */}
            <button
              disabled={filters.page >= totalPages}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: prev.page + 1,
                }))
              }
              className=" px-5 py-2.5 rounded-xl font-medium transition-all duration-200 bg-white text-gray-900 border border-gray-300 shadow-sm hover:bg-gray-100 hover:shadow dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed " >
              Next →
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItems;