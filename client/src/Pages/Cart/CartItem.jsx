import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { updateCartQty } from "../../services/Cartitems";

const CartItem = ({ item, onRemove }) => {
  const dispatch = useDispatch();

  const handleIncrease = async () => {
    try {
      dispatch(cartActions.increaseQty(item.productId));

      const data = await updateCartQty(item.productId, "increase");

      dispatch(cartActions.setCart(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrease = async () => {
    try {
      if (item.qty <= 1) return;

      dispatch(cartActions.decreaseQty(item.productId));

      const data = await updateCartQty(item.productId, "decrease");

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
        rounded-2xl
        p-3 sm:p-4
        shadow-sm
        hover:shadow-md
        transition-all duration-300
      "
    >
      <div className="flex gap-3 sm:gap-4">
        {/* IMAGE */}
        <div
          className="
            w-20 h-20
            sm:w-28 sm:h-28
            bg-gray-50 dark:bg-gray-700
            rounded-xl
            overflow-hidden
            shrink-0
            flex items-center justify-center
          "
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="
              w-full h-full
              object-contain
              p-2
              transition-transform
              duration-300
              hover:scale-105
            "
          />
        </div>

        {/* DETAILS */}
        <div className="flex-1 min-w-0">
          <h3
            className="
              font-semibold
              text-sm sm:text-base
              text-gray-900 dark:text-white
              line-clamp-2
            "
          >
            {item.title}
          </h3>

          {/* PRICE */}
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ₹{item.price * item.qty}
            </span>

            <span className="text-sm text-gray-500 line-through">
              ₹{item.price * item.qty + 200}
            </span>
          </div>

          <p className="mt-1 text-sm text-green-600 dark:text-green-400 font-medium">
            Free Delivery
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            In Stock
          </p>

          {/* ACTIONS */}
          <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
            {/* QTY */}
            <div
              className="
                flex items-center
                border border-gray-300 dark:border-gray-600
                rounded-full
                overflow-hidden
                bg-gray-50 dark:bg-gray-700
              "
            >
              <button
                onClick={handleDecrease}
                disabled={item.qty <= 1}
                aria-label="Decrease quantity"
                className="
                  w-9 h-9
                  text-lg
                  text-gray-900 dark:text-white
                  hover:bg-gray-200
                  dark:hover:bg-gray-600
                  transition
                  disabled:opacity-50
                "
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
                  w-9 h-9
                  text-lg
                  text-gray-900 dark:text-white
                  hover:bg-gray-200
                  dark:hover:bg-gray-600
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
                flex items-center
                gap-1
                text-red-500
                dark:text-red-400
                hover:text-red-600
                dark:hover:text-red-300
                font-medium
                text-sm
                transition
              "
            >
              <MdDeleteOutline size={18} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;