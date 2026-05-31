import React from "react";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ cartItems, totalPrice }) => {
  const navigate = useNavigate();

  return (
    <div
  className="
    bg-white dark:bg-gray-900
    p-4 sm:p-5
    rounded-2xl
        shadow-sm dark:shadow-none
        h-fit lg:sticky lg:top-20
        border border-gray-200 dark:border-gray-700
        transition-colors
      "
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">
        Price Details
      </h3>

      {/* PRICE ROWS */}
      <div className="space-y-3 text-sm">

        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Price ({cartItems.length} items)</span>
          <span className="font-medium text-gray-900 dark:text-white">
            ₹{totalPrice}
          </span>
        </div>

        <div className="flex justify-between text-green-700 dark:text-green-400">
          <span>Discount</span>
          <span className="font-medium">- ₹200</span>
        </div>

        <div className="flex justify-between text-gray-700 dark:text-gray-300">
          <span>Delivery Charges</span>
          <span className="font-medium text-green-700 dark:text-green-400">
            FREE
          </span>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-5" />

      {/* TOTAL */}
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          Total Amount
        </span>

        <span className="
  text-lg sm:text-xl
  font-bold dark:text-white
">
          ₹{totalPrice - 200}
        </span>
      </div>

      {/* SAVING */}
      <p className="mt-3 text-sm font-medium text-green-700 dark:text-green-400">
        You will save ₹200 on this order
      </p>

      {/* BUTTON */}
      <button
        onClick={() => navigate("/payment")}
        className="
          w-full mt-6
          bg-purple-700 md:hover:bg-purple-800
          dark:bg-purple-600 dark:md:hover:bg-purple-500
          text-white
         py-3.5 rounded-xl
          font-semibold
          transition-colors
          focus:outline-none
          focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-900
          md:hover:cursor-pointer
        "
        aria-label="Proceed to checkout"
      >
        Proceed to Checkout
      </button>

      {/* FOOTER TEXT */}
      <div
        className="
          mt-5
          rounded-lg
          bg-gray-100 dark:bg-gray-800
          px-3 py-2
          text-xs
          text-gray-700 dark:text-gray-300
          border border-gray-200 dark:border-gray-700
        "
      >
        🔒 Safe & Secure Payments with easy returns and fast refunds.
      </div>
    </div>
  );
};

export default CartSummary;