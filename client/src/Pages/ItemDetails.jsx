import { BsCart2 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import {
  getProductDetails,
} from "../services/ApiService";

import { addToCart } from "../services/Cartitems";
import { cartActions } from "../store/cartSlice";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const token = Cookies.get("jwt");
  const { id } = useParams();

  useEffect(() => {
    const productslist = async () => {
      try {
        setLoading(true);

        const data = await getProductDetails(id);
        setItems(data);
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

    if (adding) return;

    try {
      setAdding(true);

      // ✅ instant UI update
      dispatch(
        cartActions.addItem({
          productId: items._id,
          title: items.title,
          imageUrl: items.imageUrl,
          price: items.price,
          qty: 1,
        })
      );

      const response = await addToCart(items);

      // ✅ sync with backend cart
      if (response.cart) {
        dispatch(cartActions.setCart(response.cart));
      }

      if (response.message === "Item already in cart") {
        toast.info("Already in cart");
      } else {
        toast.success("Added to cart");
      }

    } catch (error) {
      console.log("fetching error", error);
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  // 🔥 LOADING SKELETON
  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen px-4 md:px-10 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 animate-pulse">

          {/* IMAGE */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800">
            <div className="w-full h-105 rounded-xl bg-gray-200 dark:bg-gray-800" />

            <div className="flex gap-2 mt-4">
              <div className="h-7 w-28 rounded-full bg-gray-200 dark:bg-gray-800" />
              <div className="h-7 w-28 rounded-full bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>

          {/* INFO */}
          <div className="space-y-5">
            <div className="h-10 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="h-8 w-32 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-800" />
            </div>

            <div className="space-y-3">
              <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-20 rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>

          {/* BUY BOX */}
          <div className="hidden xl:block bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 h-fit">
            <div className="h-8 w-32 rounded bg-gray-200 dark:bg-gray-800 mb-3" />
            <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-800 mb-6" />

            <div className="space-y-3">
              <div className="h-12 rounded-xl bg-gray-200 dark:bg-gray-800" />
              <div className="h-12 rounded-xl bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen px-4 md:px-10 py-6 pb-24 transition-colors">

      {/* MAIN */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">

        {/* IMAGE */}
        <div className=" bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 lg:sticky lg:top-24 h-fit " >
          <img src={items.imageUrl} alt={items.title} loading="eager" fetchPriority="high" className=" w-full h-80 sm:h-105 object-contain mx-auto transition-transform duration-300 hover:scale-105 " />

          <div className="flex flex-wrap gap-2 mt-5">
            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
              Free Delivery
            </span>

            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
              7 Days Return
            </span>
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-6">

          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            {items.title}
          </h1>

          {/* RATING */}
          <div className="flex items-center gap-3">
            <span className="bg-green-700 text-white px-3 py-1 text-sm rounded-lg font-medium">
              {items.rating || 4.2} ★
            </span>

            <span className="text-sm text-gray-600 dark:text-gray-400">
              1,245 ratings
            </span>
          </div>

          {/* PRICE */}
          <div
            className="
              bg-white dark:bg-gray-900
              p-5
              rounded-2xl
              border border-gray-200 dark:border-gray-800
              shadow-sm
            "
          >
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ₹{items.price}
            </p>

            <div className="flex items-center gap-3 mt-3 text-sm">
              <span className="line-through text-gray-500 dark:text-gray-400">
                ₹{items.price + 500}
              </span>

              <span className="text-green-700 dark:text-green-400 font-semibold">
                20% OFF
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Inclusive of all taxes
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className=" bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 " >
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
              Description
            </h3>

            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              {items.description}
            </p>
          </div>

          {/* SPECIFICATIONS */}
          <div
            className="
              bg-white dark:bg-gray-900
              rounded-2xl
              p-5
              border border-gray-200 dark:border-gray-800
            "
          >
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
              Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(items).map(([key, value]) => {
                if (
                  [
                    "_id",
                    "__v",
                    "createdAt",
                    "updatedAt",
                    "imageUrl",
                  ].includes(key)
                )
                  return null;

                return (
                  <div key={key} className=" bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 " >
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                      {key}
                    </p>

                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
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
        <div
          className="
            hidden xl:block
            bg-white dark:bg-gray-900
            p-6
            rounded-2xl
            border border-gray-200 dark:border-gray-800
            shadow-sm
            h-fit
            sticky top-24
          "
        >
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ₹{items.price}
          </p>

          <p className="text-green-700 dark:text-green-400 text-sm mt-2 font-medium">
            ✔ In Stock
          </p>

          <div className="flex flex-col gap-3 mt-6">

            <button onClick={AddToCart} disabled={adding} className=" bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 " >
              <BsCart2 />
              {adding ? "Adding..." : "Add to Cart"}
            </button>

            <button className=" bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition-colors " >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BAR */}
      <div className=" fixed bottom-0 left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur border-t border-gray-200 dark:border-gray-800 p-3 flex gap-3 xl:hidden z-50 " >
        <button onClick={AddToCart} disabled={adding} className=" flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 " >
          <BsCart2 />
          {adding ? "Adding..." : "Add to Cart"}
        </button>

        <button className=" flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition-colors " >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;