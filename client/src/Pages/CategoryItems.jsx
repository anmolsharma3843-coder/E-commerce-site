import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../services/ApiService";
import { addToCart } from "../services/Cartitems";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { getWishlist, toggleWishlist } from "../services/WishlistService";
const CategoryItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const token = Cookies.get("jwt");
   
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
   
  // 🔥 FETCH
  const fetchItems = async (currentFilters) => {
    setLoading(true);
    try {
      const query = new URLSearchParams(currentFilters).toString();

      const data = await getProducts(currentFilters);

      setItems(data.products || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category,
      page: 1,
    }));
  }, [category]);

  useEffect(() => {
    fetchItems(filters);
  }, [
    filters.category,
    filters.sort,
    filters.minPrice,
    filters.maxPrice,
    filters.page,
  ]);

  // 🔥 SORT
  const handleSort = (value) => {
    setFilters((prev) => ({
      ...prev,
      sort: value,
      page: 1,
    }));
  };

  // 🔥 PRICE
  const handlePrice = (min, max) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
      page: 1,
    }));
  };
  const AddToCart = async (item) => {
    if (!token) { navigate("/login"); return; } try {
      // call backend API with full product object 
      const response = await addToCart(item); 
      if (response.message === "Item already in cart")
         { toast.success("Already in cart"); 
         } else { toast.success("Added to cart"); }
    } catch (error) { 
      console.log("fetching error", error);
      toast.error("Failed to add to cart");
     }
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">

      {/* HEADER */}
      <div className="bg-white dark:bg-gray-800 px-4 md:px-8 py-4 shadow-sm flex flex-col md:flex-row justify-between gap-3">
        <h1 className="text-xl md:text-2xl font-semibold capitalize text-gray-800 dark:text-white">
          {category}
        </h1>

        <select
          onChange={(e) => handleSort(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
        >
          <option value="">Sort by: Relevance</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* SIDEBAR */}
        <div className="hidden lg:block col-span-1 bg-white dark:bg-gray-800 rounded-xl p-4 h-fit sticky top-20 shadow-sm">

          <h2 className="text-lg mb-4 dark:text-gray-100 font-bold">Filters</h2>

          <div className="space-y-3 text-sm dark:text-gray-100">
            <button
              onClick={() => handlePrice(0, 500)}
              className="block w-full text-left hover:text-indigo-600"
            >
              Under ₹500
            </button>
            <button
              onClick={() => handlePrice(500, 1000)}
              className="block w-full text-left hover:text-indigo-600"
            >
              ₹500 - ₹1000
            </button>
            <button
              onClick={() => handlePrice(1000, 5000)}
              className="block w-full text-left hover:text-indigo-600"
            >
              ₹1000 - ₹5000
            </button>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="col-span-4">

          {/* LOADING */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white dark:bg-gray-800 rounded-xl h-64"
                />
              ))}
            </div>
          ) : (

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

              {items.map((item) => {
                const isWishlisted = wishlist.some(
            (i) => i._id === item._id
          );
          return(
                <div
                  key={item._id}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer  flex flex-col h-full"
                >

                  {/* IMAGE */}
                  <div className="relative h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                    />

                   <button
                                     onClick={(e) => handleWishlist(item._id, e)}
                                     className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition
                                     ${
                                       isWishlisted
                                         ? "bg-red-500 text-white scale-110"
                                         : "bg-white text-gray-700 hover:bg-red-100"
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
                  <div className="p-3 space-y-2">
                    <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-1 ">
                      {item.title}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                        {item.rating || 4.2} ★
                      </span>
                    </div>

                    <div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ₹{item.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ₹{item.price + 500}
                      </span>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); AddToCart(item) }}
                      className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 text-sm py-2 rounded-md font-medium hover:cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
          )
})}

            </div>
          )}

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={filters.page === 1}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: prev.page - 1,
                }))
              }
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-gray-700 dark:text-gray-300">
              Page {filters.page}
            </span>

            <button
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: prev.page + 1,
                }))
              }
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategoryItems;