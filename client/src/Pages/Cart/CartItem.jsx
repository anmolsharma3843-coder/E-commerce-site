import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { updateCartQty } from "../../services/Cartitems";

const CartItem = ({ item, onRemove }) => {
  const dispatch = useDispatch();

  const handleIncrease = async () => {
    try {
      // ✅ Optimistic Update
      dispatch(cartActions.increaseQty(item.productId));

      const data = await updateCartQty(item.productId, "increase");

      // ✅ Sync with backend
      dispatch(cartActions.setCart(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrease = async () => {
    try {
      // ✅ Prevent qty below 1
      if (item.qty <= 1) return;

      // ✅ Optimistic Update
      dispatch(cartActions.decreaseQty(item.productId));

      const data = await updateCartQty(item.productId, "decrease");

      // ✅ Sync with backend
      dispatch(cartActions.setCart(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <div
  className="
    bg-white dark:bg-gray-800
    border border-gray-200 dark:border-gray-700
    rounded-xl
    p-3 sm:p-4
    shadow-sm
    md:hover:shadow-md
    transition-all duration-300
    flex gap-3
  "
>

      {/* IMAGE */}
     <div
  className="
    w-24 h-24
    sm:w-32 sm:h-32
    bg-gray-50 dark:bg-gray-700
    rounded-lg
    overflow-hidden
    flex items-center justify-center
    shrink-0
  "
>
        <img
          src={`${import.meta.env.VITE_BASE_URL}${item.imageUrl}`}
          alt={item.title}
          loading="lazy"
          width="128"
          height="128"
          className="
  w-full h-full
  object-contain
  p-1
  md:hover:scale-105
  transition-transform duration-300
"
        />
      </div>

      {/* DETAILS */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">

        <div>
          <h3
            className="
              font-semibold text-sm sm:text-lg
              text-gray-900 dark:text-white
              line-clamp-2
            "
          >
            {item.title}
          </h3>

         <div className="mt-2">
  <p className="font-bold text-lg text-gray-900 dark:text-white">
    ₹{item.price * item.qty}
  </p>

  <p className="text-sm text-gray-600 dark:text-gray-300">
    In Stock
  </p>
</div>
          <p className="text-green-700 dark:text-green-400 text-sm mt-1 font-medium">
            Free Delivery
          </p>
          
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap items-center gap-4 mt-5">

          {/* QTY */}
          <div
            className="
              flex items-center
              border border-gray-300 dark:border-gray-600
              rounded-full overflow-hidden
              bg-gray-50 dark:bg-gray-700
            "
          >
            <button
              onClick={handleDecrease}
              aria-label="Decrease quantity"
              className="
              w-10 h-8
                text-gray-800 dark:text-white
                md:hover:bg-gray-200 dark:md:hover:bg-gray-600
                transition
                disabled:opacity-50
              "
              disabled={item.qty <= 1}
            >
              −
            </button>

            <span
              className="
                w-10
                text-center
                font-medium
                text-gray-900 dark:text-white
              "
            >
              {item.qty}
            </span>

            <button
              onClick={handleIncrease}
              aria-label="Increase quantity"
              className="
                 w-10 h-8
                text-gray-800 dark:text-white
                md:hover:bg-gray-200 dark:md:hover:bg-gray-600
                transition
              "
            >
              +
            </button>
          </div>

          {/* REMOVE */}
          <button
            onClick={() => onRemove(item.productId, item.title)}
            aria-label="Remove item"
            className="
              flex items-center gap-1
              text-red-600 dark:text-red-400
              md:hover:text-red-700 dark:md:hover:text-red-300
              font-medium text-sm
              transition
            "
          >
            <MdDeleteOutline size={18} />
            Remove
          </button>
        </div>
      </div>

      {/* PRICE */}
     <div className="hidden sm:block sm:text-right">
        <div>
          <p className="font-bold text-xl text-gray-900 dark:text-white">
            ₹{item.price * item.qty}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 line-through mt-1">
            ₹{item.price * item.qty + 200}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;