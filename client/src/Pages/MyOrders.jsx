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
    return <p className="text-red-500 text-center">{error}</p>;

  return (
   <div className=" mx-auto p-4 text-gray-900 dark:text-gray-100 dark:bg-gray-700">
  <h1 className="text-2xl font-bold mb-6">My Orders</h1>

  {orders.length === 0 ? (
    <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
      No orders yet 🛒
    </div>
  ) : (
    orders.map((order) => {
      const currentIndex = statusSteps.indexOf(order.status);

      return (
        <div
          key={order._id}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 mb-6 shadow-sm hover:shadow-md transition"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Order ID
              </p>
              <p className="font-semibold">
                #{order._id.slice(-6)}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Placed on
              </p>
              <p className="text-sm">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* ITEMS */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-3"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md border border-gray-200 dark:border-gray-700"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Qty: {item.qty}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{item.price * item.qty}
                </p>
              </div>
            ))}
          </div>

          {/* STATUS TRACKER */}
          <div className="mt-5">
            <div className="flex justify-between text-xs mb-2">
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

            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 dark:bg-green-400 transition-all"
                style={{
                  width: `${
                    ((currentIndex + 1) / statusSteps.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center mt-5">
            <p className="font-bold text-lg">
              ₹{order.totalAmount}
            </p>

            <span
              className={`px-3 py-1 text-xs rounded-full font-medium ${
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