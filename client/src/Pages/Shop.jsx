import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { fetchAllproduct } from "../services/ApiService";
import ShopSkeleton from "../components/Skeleton/ShopSkeleton";

const Shop = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [wishlist, setWishlist] = useState([]);

  const [sort, setSort] = useState("latest");
  const [category, setCategory] = useState("All");

  const search = searchParams.get("search") || "";

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

  // WISHLIST
  const toggleWishlist = (id, e) => {
    e.stopPropagation();

    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">

      <div className="px-4 md:px-10 py-8">

        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          {/* RESULTS */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {search
                ? `Search Results for "${search}"`
                : "All Products"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {filteredProducts.length} Products Found
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3">

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              {categories.map((cat) => (
                <option key={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* SORT */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="latest">Latest</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* LOADING */}
        {loading ? <ShopSkeleton/>: filteredProducts.length === 0 ? (
          // EMPTY STATE
          <div className="flex flex-col items-center justify-center py-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
              alt="No products"
              className="w-40 opacity-80"
            />

            <h3 className="mt-6 text-2xl font-bold text-gray-700 dark:text-white">
              No Products Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try searching something else
            </p>
          </div>
        ) : (
          // PRODUCTS
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredProducts.map((item) => {
              const isWishlisted = wishlist.includes(item._id);

              return (
                <div
                  key={item._id}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer relative"
                >

                  {/* IMAGE */}
                  <div className="relative overflow-hidden">

                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-70 object-cover group-hover:scale-110 transition duration-500"
                    />

                    {/* WISHLIST */}
                    <button
                      onClick={(e) =>
                        toggleWishlist(item._id, e)
                      }
                      aria-label="Wishlist"
                      className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition
                      ${
                        isWishlisted
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {isWishlisted ? (
                        <FaHeart />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">

                    {/* CATEGORY */}
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {item.category}
                    </p>

                    {/* TITLE */}
                    <h3 className="mt-1 text-sm md:text-base font-semibold text-gray-800 dark:text-white line-clamp-2">
                      {item.title}
                    </h3>

                    {/* RATING */}
                    <div className="flex items-center gap-1 mt-2">
                      <FaStar className="text-yellow-400 text-sm" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {item.rating || 4.5}
                      </span>
                    </div>

                    {/* PRICE */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-lg font-bold">
                        ₹{item.price}
                      </span>

                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.price + 800}
                      </span>
                    </div>

                    {/* BUTTON */}
                    <button
                      className="mt-4 w-full  bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-xl hover:scale-[1.02] transition"
                    >
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