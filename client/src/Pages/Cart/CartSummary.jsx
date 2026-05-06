import React from "react";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ cartItems, totalPrice }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow dark:shadow-none h-fit sticky top-20 border border-transparent dark:border-gray-700 transition">

      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Price Details
      </h3>

      <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-2">
        <span>Price ({cartItems.length} items)</span>
        <span>₹{totalPrice}</span>
      </div>

      <div className="flex justify-between text-green-600 dark:text-green-400 mb-2">
        <span>Discount</span>
        <span>- ₹200</span>
      </div>

      <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-2">
        <span>Delivery</span>
        <span className="text-green-600 dark:text-green-400">FREE</span>
      </div>

      <hr className="my-3 border-gray-200 dark:border-gray-700" />

      <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
        <span>Total</span>
        <span>₹{totalPrice - 200}</span>
      </div>

      <button
        onClick={() => navigate("/payment")}
        className="w-full mt-5 bg-purple-700 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-500 text-white py-3 rounded-lg font-semibold transition hover:cursor-pointer"
      >
        Proceed to Checkout
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        🔒 Safe and Secure Payments. Easy returns.
      </p>
    </div>
  );
};

export default CartSummary;