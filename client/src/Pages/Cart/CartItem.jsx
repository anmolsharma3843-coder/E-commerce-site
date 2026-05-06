import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { updateCartQty } from "../../services/Cartitems";

const CartItem = ({ item, onRemove }) => {
  const dispatch = useDispatch();

  const handleIncrease = async () => {
    dispatch(cartActions.increaseQty(item.productId));
    const data = await updateCartQty(item.productId, "increase");
    dispatch(cartActions.setCart(data));
  };

  const handleDecrease = async () => {
    dispatch(cartActions.decreaseQty(item.productId));
    const data = await updateCartQty(item.productId, "decrease");
    dispatch(cartActions.setCart(data));
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm dark:shadow-none flex gap-4 border border-transparent dark:border-gray-700 transition">

      {/* IMAGE */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-28 h-28 object-contain rounded-lg bg-gray-100"
      />

      {/* DETAILS */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
          {item.title}
        </h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          ₹{item.price} • In Stock
        </p>

        <p className="text-green-600 dark:text-green-400 text-sm mt-1">
          Free Delivery
        </p>

        <div className="flex items-center gap-4 mt-4">

          {/* QTY */}
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <button
              onClick={handleDecrease}
              className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100 hover:text-purple-700"
            >
              -
            </button>

            <span className="px-4 text-gray-800 dark:text-gray-100 ">
              {item.qty}
            </span>

            <button
              onClick={handleIncrease}
              className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100 hover:text-purple-700"
            >
              +
            </button>
          </div>

          {/* REMOVE */}
          <button
            onClick={() => onRemove(item.productId, item.title)}
            className="flex items-center gap-1 text-red-500 hover:text-red-600 dark:hover:text-red-400"
             aria-label="Remove item"
          >
            <MdDeleteOutline /> Remove
          </button>
        </div>
      </div>

      {/* PRICE SIDE */}
      <div className="text-right">
        <p className="font-bold text-lg text-gray-900 dark:text-white">
          ₹{item.price * item.qty}
        </p>

        <p className="text-sm text-gray-400 dark:text-gray-500 line-through">
          ₹{item.price * item.qty + 200}
        </p>
      </div>
    </div>
  );
};

export default CartItem;