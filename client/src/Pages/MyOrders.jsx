import React, { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";

const statusSteps = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data.orders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 animate-pulse">
        Loading your orders...
      </div>
    );

  if (error)
    return (
      <p className="text-red-500 text-center mt-10">
        {error}
      </p>
    );

  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6 text-gray-900 dark:text-gray-100 dark:bg-gray-700 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh] text-center text-gray-500 dark:text-gray-400 text-xl sm:text-2xl">
          No orders yet 🛒
        </div>
      ) : (
        orders.map((order) => {
          const currentIndex = statusSteps.indexOf(
            order.status
          );

          return (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 sm:p-5 mb-6 shadow-sm md:hover:shadow-md transition"
            >
              {/* HEADER */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Order ID
                  </p>
                  <p className="font-semibold break-all">
                    #{order._id.slice(-6)}
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Placed on
                  </p>
                  <p className="text-sm">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* ITEMS */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3 py-3"
                  >
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}${item.imageUrl}`}
                      alt={item.title}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-md border border-gray-200 dark:border-gray-700 shrink-0"
                    />

                    <div className="flex-1 min-w-0 w-full">
                      <p className="font-medium break-words">
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Qty: {item.qty}
                      </p>
                    </div>

                    <p className="font-semibold self-end sm:self-auto">
                      ₹{item.price * item.qty}
                    </p>
                  </div>
                ))}
              </div>

              {/* STATUS TRACKER */}
              <div className="mt-5">
                {/* Desktop Labels */}
                <div className="hidden md:flex justify-between text-xs mb-2">
                  {statusSteps.map((step, index) => (
                    <span
                      key={step}
                      className={`flex-1 text-center ${
                        index <= currentIndex
                          ? "text-green-600 dark:text-green-400 font-medium"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {step}
                    </span>
                  ))}
                </div>

                {/* Mobile Status */}
                <div className="md:hidden mb-2 text-center">
                  <span
                    className={`text-sm font-medium ${
                      currentIndex >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500"
                    }`}
                  >
                    Current Status: {order.status}
                  </span>
                </div>

                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 dark:bg-green-400 transition-all duration-500"
                    style={{
                      width: `${
                        ((currentIndex + 1) /
                          statusSteps.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-5">
                <p className="font-bold text-lg">
                  ₹{order.totalAmount}
                </p>

                <span
                  className={`px-3 py-1 text-xs sm:text-sm rounded-full font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyOrders;