import { BsCart2 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { getProductDetails, getrelatedProduct } from "../services/ApiService";
import { addToCart } from "../services/Cartitems";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState({});
  const [relatedItems, setRelatedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("jwt");
  const { id } = useParams();

  useEffect(() => {
    const productslist = async () => {
      try {
        const data = await getProductDetails(id);
        // const relatedData = await getrelatedProduct(id);
        setItems(data);
        setRelatedItems(relatedData);
      } catch (error) {
        console.log("fetching error", error);
      } finally {
        setLoading(false);
      }
    };

    productslist();
  }, [id]);

  const AddToCart = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await addToCart(items);

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

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen px-4 md:px-10 py-6 pb-24">

      {/* MAIN SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">

        {/* IMAGE */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 lg:sticky lg:top-20 h-fit">
          <img
            src={items.imageUrl}
            alt={items.title}
            className="w-full h-75 sm:h-100 object-contain mx-auto hover:scale-105 transition"
          />

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
              Free Delivery
            </span>
            <span className="text-xs bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
              7 Days Return
            </span>
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-5">

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold dark:text-white">
            {items.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <span className="bg-green-600 text-white px-2 py-1 text-sm rounded-md">
              {items.rating} ★
            </span>
            <span className="text-sm text-gray-500">
              1,245 ratings
            </span>
          </div>

          {/* PRICE BOX */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <p className="text-2xl sm:text-3xl font-bold dark:text-white">
              ₹{items.price}
            </p>

            <div className="flex gap-2 mt-2 text-sm">
              <span className="line-through text-gray-400">
                ₹{items.price + 500}
              </span>
              <span className="text-green-600 font-semibold">
                20% OFF
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Inclusive of all taxes
            </p>
          </div>

          {/* DESCRIPTION */}
          <div>
            <h3 className="font-semibold text-lg mb-2 dark:text-white">
              Description
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {items.description}
            </p>
          </div>

          {/* SPECS */}
          <div>
            <h3 className="font-semibold text-lg mb-3 dark:text-white">
              Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {Object.entries(items).map(([key, value]) => {
                if (
                  ["_id", "__v", "createdAt", "updatedAt", "imageUrl"].includes(key)
                )
                  return null;

                return (
                  <div
                    key={key}
                    className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
                  >
                    <p className="text-gray-500 capitalize">{key}</p>
                    <p className="font-medium dark:text-gray-200">
                      {Array.isArray(value)
                        ? value.join(", ")
                        : String(value)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* DESKTOP BUY BOX */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow h-fit lg:sticky lg:top-20 hidden lg:block">

          <p className="text-2xl font-bold dark:text-white">
            ₹{items.price}
          </p>

          <p className="text-green-600 text-sm mt-1">✔ In Stock</p>

          <div className="flex flex-col gap-3 mt-5">
            <button
              onClick={AddToCart}
              className="bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <BsCart2 /> Add to Cart
            </button>

            <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {/* <div className="max-w-7xl mx-auto mt-16">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Related Products
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {relatedItems.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
            >
              <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition"
                />

                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-md">
                  {item.rating} ★
                </span>
              </div>

              <div className="p-3">
                <p className="text-sm font-medium line-clamp-2 dark:text-gray-200">
                  {item.title}
                </p>

                <div className="flex justify-between mt-2">
                  <p className="font-semibold dark:text-white">
                    ₹{item.price}
                  </p>

                  <span className="text-xs text-green-600">
                    In Stock
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* 🔥 MOBILE STICKY BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t p-3 flex gap-3 lg:hidden z-50">

        <button
          onClick={AddToCart}
          className="flex-1 bg-yellow-400 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <BsCart2 /> Add to Cart
        </button>

        <button className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold">
          Buy Now
        </button>

      </div>

    </div>
  );
};

export default ItemDetails;