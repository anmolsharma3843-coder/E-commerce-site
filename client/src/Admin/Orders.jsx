import React, { useEffect, useMemo, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openOrder, setOpenOrder] = useState(null);
  const [search, setSearch] = useState("");

  const statusList = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        console.log("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const data = await updateOrderStatus(id, status);

      if (data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === id ? data.order : order
          )
        );
      }
    } catch (err) {
      console.log("Status update error:", err);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";

      case "Cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";

      case "Shipped":
      case "Out for Delivery":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";

      case "Confirmed":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";

      default:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const text = search.toLowerCase();

      return (
        order._id.toLowerCase().includes(text) ||
        order.address?.name
          ?.toLowerCase()
          .includes(text) ||
        order.paymentMethod
          ?.toLowerCase()
          .includes(text) ||
        order.status.toLowerCase().includes(text)
      );
    });
  }, [orders, search]);

  const stats = {
    totalOrders: orders.length,
    delivered: orders.filter(
      (o) => o.status === "Delivered"
    ).length,
    pending: orders.filter(
      (o) => o.status === "Pending"
    ).length,
    revenue: orders
      .filter((o) => o.status !== "Cancelled")
      .reduce(
        (acc, item) => acc + item.totalAmount,
        0
      ),
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 dark:text-white">
            Loading Orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Orders Management
        </h1>

        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="px-4 py-2 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon="🧾"
        />

        <StatCard
          title="Delivered"
          value={stats.delivered}
          icon="✅"
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          icon="⏳"
        />

        <StatCard
          title="Revenue"
          value={`₹${stats.revenue}`}
          icon="💰"
        />
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr className="text-left">
              <th className="p-4">Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <React.Fragment key={order._id}>
                <tr className="border-t dark:border-gray-700">
                  <td className="p-4 font-medium">
                    #{order._id.slice(-6)}
                  </td>

                  <td>
                    {order.address?.name ||
                      "Unknown"}
                  </td>

                  <td className="font-semibold text-green-600">
                    ₹{order.totalAmount}
                  </td>

                  <td>{order.paymentMethod}</td>

                  <td>
                    <div className="space-y-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>

                      <select
                        value={order.status}
                        disabled={
                          order.status ===
                            "Delivered" ||
                          order.status ===
                            "Cancelled"
                        }
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                        className="block text-xs p-2 rounded border dark:bg-gray-700 dark:text-white"
                      >
                        {statusList.map((s) => (
                          <option key={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>

                  <td>
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        setOpenOrder(
                          openOrder === order._id
                            ? null
                            : order._id
                        )
                      }
                      className="text-indigo-600 font-medium"
                    >
                      {openOrder === order._id
                        ? "Hide"
                        : "View"}
                    </button>
                  </td>
                </tr>

                {openOrder === order._id && (
                  <tr>
                    <td colSpan="7">
                      <Expanded order={order} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold dark:text-white">
                #{order._id.slice(-6)}
              </h3>

              <span
                className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <p className="mt-2 text-gray-500 dark:text-gray-300">
              {order.address?.name}
            </p>

            <p className="font-bold text-green-600 mt-2">
              ₹{order.totalAmount}
            </p>

            <button
              onClick={() =>
                setOpenOrder(
                  openOrder === order._id
                    ? null
                    : order._id
                )
              }
              className="mt-3 text-indigo-600"
            >
              {openOrder === order._id
                ? "Hide Details"
                : "View Details"}
            </button>

            {openOrder === order._id && (
              <Expanded order={order} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow">
    <div className="text-2xl mb-2">{icon}</div>
    <h3 className="text-sm text-gray-500 dark:text-gray-400">
      {title}
    </h3>
    <p className="text-2xl font-bold dark:text-white">
      {value}
    </p>
  </div>
);

const Expanded = ({ order }) => (
  <div className="p-4 bg-gray-50 dark:bg-gray-900">
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold dark:text-white mb-2">
          Delivery Address
        </h3>

        <p className="dark:text-gray-300">
          {order.address?.name}
        </p>

        <p className="dark:text-gray-300">
          {order.address?.phone}
        </p>

        <p className="dark:text-gray-300">
          {order.address?.address}
        </p>

        <p className="dark:text-gray-300">
          {order.address?.city}
        </p>
      </div>

      <div>
        <h3 className="font-semibold dark:text-white mb-2">
          Ordered Items
        </h3>

        <div className="space-y-2">
          {order.items?.map((item, i) => (
            <div
              key={i}
              className="flex justify-between bg-white dark:bg-gray-800 p-3 rounded-lg"
            >
              <div>
                <p className="font-medium dark:text-white">
                  {item.title}
                </p>

                <p className="text-xs text-gray-500">
                  Qty: {item.qty}
                </p>
              </div>

              <p className="font-semibold dark:text-white">
                ₹{item.price * item.qty}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Orders;