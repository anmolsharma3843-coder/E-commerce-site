import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { deleteProductApi, fetchAllproduct } from "../services/productApi";
import { toast } from "react-toastify";


const ManageProducts = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const fetchProducts = async () => {
    try {
      const data = await fetchAllproduct();
      setProduct(data);
    } catch (error) {
      console.log("fetching error", error);
    } finally {
      setLoading(false)
    }
  };

  const deleteProduct = async (id) => {
    await deleteProductApi(id)
    toast.success('successfully deleted 👍')
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const itemnavigate = (id) => {
    navigate(`/admin/editproducts/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">

      {/* Header */}
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-10 text-center">
        Manage Products
      </h2>

      {/* Product Grid */}
      {loading ? (
        <div className="mt-50">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {product.map((p) => (
            <div
              key={p._id}
              className="flex flex-col sm:flex-row items-start 
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700 
          rounded-lg shadow-md md:hover:shadow-lg 
          transition-transform duration-300 md:hover:-translate-y-1 p-6"
            >
              {/* Product Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center
  bg-gray-100 
  rounded-lg overflow-hidden">

                <img
                  src={`${import.meta.env.VITE_BASE_URL}${p.imageUrl}`}
                  alt={p.title}
                  className="w-full h-full object-contain 
  transition duration-300
  dark:brightness-90 dark:contrast-110"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 sm:ml-6 mt-4 sm:mt-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                  {p.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {p.description}
                </p>

                {/* Price + Rating */}
                <div className="flex sm:items-center justify-between mt-3 flex-col sm:flex-row">
                  <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    ₹{Math.round(p.price)}
                  </p>

                  <div className="flex items-center">
                    {Array.from({ length: p.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">⭐</span>
                    ))}
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      {p.rating}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="w-full sm:w-auto text-sm 
                bg-red-500 md:hover:bg-red-600 
                text-white px-4 py-1.5 rounded-md 
                transition-colors shadow-sm"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => itemnavigate(p._id)}
                    className="w-full sm:w-auto text-sm 
                bg-yellow-400 md:hover:bg-yellow-500 
                text-gray-900 
                dark:bg-yellow-500 dark:md:hover:bg-yellow-600 dark:text-gray-900
                px-4 py-1.5 rounded-md 
                transition-colors shadow-sm"
                  >
                    Edit
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
