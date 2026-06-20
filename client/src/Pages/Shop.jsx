import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { fetchAllproduct } from "../services/productApi";
import ShopSkeleton from "../components/Skeleton/ShopSkeleton";
import { getWishlist, toggleWishlist } from "../services/WishlistService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../services/Cartitems";
import { toast } from "react-toastify";
import { cartActions } from "../store/cartSlice";

const Shop = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [wishlist, setWishlist] = useState([]);

  const [sort, setSort] = useState("latest");
  const [category, setCategory] = useState("All");

  const search = searchParams.get("search") || "";

  const user = useSelector((state) => state.auth.user);

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchAllproduct();

        setAllProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
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
  //handle wishlist
  const handleWishlist = async (id, e) => {
    e.stopPropagation();

    try {
      const updated = await toggleWishlist(id);
      setWishlist(updated);
    } catch (err) {
      console.log("Wishlist toggle error:", err);
    }
  };

  // CATEGORIES
  const categories = useMemo(() => {
    const unique = [
      "All",
      ...new Set(allProducts.map((item) => item.category)),
    ];

    return unique;
  }, [allProducts]);

  // FILTER + SORT
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // SEARCH
    if (search) {
      filtered = filtered.filter((item) => {
        return (
          item.title?.toLowerCase().includes(search.toLowerCase()) ||
          item.category?.toLowerCase().includes(search.toLowerCase()) ||
          item.description?.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    // CATEGORY
    if (category !== "All") {
      filtered = filtered.filter(
        (item) => item.category === category
      );
    }

    // SORT
    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [allProducts, search, sort, category]);
   const AddToCart = async (item) => {
      if (!user) {
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
    <section className="min-h-screen bg-gray-100 dark:bg-[#0f172a] transition-colors duration-300">
      <div className="px-4 md:px-8 lg:px-12 py-8">

        {/* TOP BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

          {/* TITLE */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {search
                ? `Search Results for "${search}"`
                : "Discover Products"}
            </h2>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {filteredProducts.length} products available
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3">

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 
          bg-white dark:bg-[#1e293b]
          text-gray-800 dark:text-gray-100
          shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            {/* SORT */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 
          bg-white dark:bg-[#1e293b]
          text-gray-800 dark:text-gray-100
          shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="latest">Latest</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <ShopSkeleton />
        ) : filteredProducts.length === 0 ? (
          // EMPTY STATE
          <div className="flex flex-col items-center justify-center py-24">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
              alt="No products"
              className="w-40 opacity-80"
            />

            <h3 className="mt-6 text-2xl font-bold text-gray-800 dark:text-white">
              No Products Found
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Try searching for something else
            </p>
          </div>
        ) : (
          // PRODUCTS GRID
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((item) => {
              const isWishlisted = wishlist.some(
                (i) => i._id === item._id
              );

              return (
                <div
                  key={item._id}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-800 shadow-sm md:hover:shadow-2xl md:hover:-translate-y-1 transition-all duration-300 cursor-pointer" >
                  {/* IMAGE SECTION */}
                  <div className="relative overflow-hidden bg-white dark:bg-gray-800">

                    {/* IMAGE */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-64 object-contain md:group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* WISHLIST */}
                    <button onClick={(e) => handleWishlist(item._id, e)} aria-label="Wishlist" className={` absolute top-3 right-3 p-2 rounded-full shadow-md transition ${isWishlisted ? "bg-red-500 text-white scale-110" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 md:hover:bg-red-100"} `} >
                      {isWishlisted ? (
                        <FaHeart size={14} />
                      ) : (
                        <FaRegHeart size={14} />
                      )}
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">

                    {/* CATEGORY */}
                    <p className="text-xs uppercase tracking-wide font-medium text-indigo-600 dark:text-indigo-400">
                      {item.category}
                    </p>

                    {/* TITLE */}
                    <h2 className="mt-1 text-sm md:text-base font-bold text-gray-900 dark:text-gray-100 line-clamp-1 leading-6" >
                      {item.title}
                    </h2>
                    <h3 className="text-xs md:text-sm  text-gray-500 dark:text-gray-300 line-clamp-2 leading-tight min-h-9" >
                      {item.description}
                    </h3>

                    {/* RATING + STOCK */}
                    <div className="flex items-center justify-between mt-3">

                      {/* RATING */}
                      <div
                        className="flex items-center gap-1
                    px-2 py-1 rounded-lg
                    bg-amber-50 dark:bg-amber-500/10"
                      >
                        <FaStar className="text-amber-500 text-sm" />

                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {item.rating || 4.5}
                        </span>
                      </div>

                      {/* STOCK */}
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        In Stock
                      </span>
                    </div>

                    {/* PRICE */}
                    <div className="mt-4 flex items-end gap-2 flex-wrap">

                      {/* CURRENT PRICE */}
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ₹{item.price}
                      </span>

                      {/* OLD PRICE */}
                      <span className="text-sm line-through text-gray-500 dark:text-gray-400">
                        ₹{item.price + 800}
                      </span>
                    </div>

                    {/* BUTTON */}
                    <button 
                     onClick={(e) => {
                          e.stopPropagation();
                          AddToCart(item);
                        }} 
                    className="mt-5 w-full rounded-xl bg-yellow-400 md:hover:bg-yellow-500 text-white font-medium py-2.5 shadow-md md:hover:shadow-lg active:scale-[0.98] transition-all duration-200" >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;