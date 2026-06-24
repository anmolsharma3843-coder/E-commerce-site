import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteProductApi,
  fetchAllproduct,
} from "../services/productApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import {
  FaBoxOpen,
  FaSearch,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await fetchAllproduct();

      setProducts(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProductApi(id);

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

      toast.success("Product deleted successfully 👍");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const editProduct = (id) => {
    navigate(`/admin/editproducts/${id}`);
  };

  const filteredProducts = products.filter((product) =>
    product.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalProducts = products.length;

  const averagePrice = useMemo(() => {
    if (!products.length) return 0;

    return Math.round(
      products.reduce(
        (acc, product) => acc + product.price,
        0
      ) / products.length
    );
  }, [products]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      {/* Header */}
      <div className="bg-linear-to-r from-purple-600 to-indigo-600 rounded-3xl p-6 text-white shadow-lg mb-6">
        <h1 className="text-3xl font-bold">
          Product Management
        </h1>

        <p className="mt-2 opacity-90">
          Manage all store products from one place
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow">
          <p className="text-sm text-gray-500">
            Total Products
          </p>

          <div className="flex items-center justify-between mt-2">
            <h2 className="text-3xl font-bold dark:text-white">
              {totalProducts}
            </h2>

            <FaBoxOpen className="text-2xl text-indigo-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow">
          <p className="text-sm text-gray-500">
            Average Price
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            ₹{averagePrice}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className=" w-full pl-4 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 " />
        <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {loading ? (
        <div className="mt-40">
          <LoadingSpinner />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 text-center shadow">
          <h2 className="text-xl font-semibold dark:text-white">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try another search term.
          </p>
        </div>
      ) : (
        <div
          className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 " >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className=" bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition " >
              {/* Image */}
              <div className="h-52 bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="font-semibold text-lg line-clamp-1 dark:text-white">
                  {product.title}
                </h2>

                <p className="text-sm text-gray-500 line-clamp-2 mt-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-xl dark:text-white">
                    ₹{Math.round(product.price)}
                  </span>

                  <span
                    className=" text-xs px-2 py-1 rounded-full bg-green-100 text-green-600"
                  > In Stock
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center mt-3">
                  {Array.from({
                    length: Math.round(
                      product.rating || 0
                    ),
                  }).map((_, i) => (
                    <span
                      key={i}
                      className="text-yellow-400"
                    >
                      ⭐
                    </span>
                  ))}

                  <span className="ml-2 text-sm text-gray-500">
                    ({product.rating})
                  </span>
                </div>

                {/* Category */}
                {product.category && (
                  <span className="inline-block mt-3 text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() =>
                      editProduct(product._id)
                    }
                    className=" flex-1 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 py-2 rounded-lg font-medium " >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteProduct(product._id)
                    }
                    className=" flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium " >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;