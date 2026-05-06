import { useEffect, useState } from "react";
import React from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openOrder, setOpenOrder] = useState(null);

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
        const res = await fetch("http://localhost:5100/orders");
        const data = await res.json();
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
      const res = await fetch(
        `http://localhost:5100/orders/update-status/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? data.order : o))
        );
      }
    } catch (err) {
      console.log("Status update error:", err);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300";
      case "Shipped":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">

      <h1 className="text-xl md:text-3xl font-bold mb-6 dark:text-white">
        Orders Management
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <>
          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 sticky top-0">
                <tr>
                  <th className="p-3 text-left">Order</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="p-3 font-medium">
                        #{order._id.slice(-6)}
                      </td>

                      <td>{order.userId}</td>

                      <td className="text-green-600 font-semibold">
                        ₹{order.totalAmount}
                      </td>

                      <td>
                        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                          {order.paymentMethod}
                        </span>
                      </td>

                      <td>
                        <div className="space-y-1">
                          <span className={`px-2 py-1 text-xs rounded ${getStatusStyle(order.status)}`}>
                            {order.status}
                          </span>

                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateStatus(order._id, e.target.value)
                            }
                            className="block text-xs border rounded p-1 dark:bg-gray-700"
                          >
                            {statusList.map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </td>

                      <td>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                      <td>
                        <button
                          onClick={() =>
                            setOpenOrder(
                              openOrder === order._id ? null : order._id
                            )
                          }
                          className="text-indigo-600 text-sm"
                        >
                          {openOrder === order._id ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>

                    {openOrder === order._id && (
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td colSpan="7" className="p-4">
                          <Expanded order={order} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARDS ================= */}
          <div className="md:hidden space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-sm">
                    #{order._id.slice(-6)}
                  </h2>
                  <span className={`px-2 py-1 text-xs rounded ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {order.userId}
                </p>

                <p className="font-bold mt-2 text-green-600">
                  ₹{order.totalAmount}
                </p>

                <div className="mt-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="w-full text-sm border rounded p-2 dark:bg-gray-700"
                  >
                    {statusList.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() =>
                    setOpenOrder(
                      openOrder === order._id ? null : order._id
                    )
                  }
                  className="text-indigo-600 text-sm mt-3"
                >
                  {openOrder === order._id ? "Hide Details" : "View Details"}
                </button>

                {openOrder === order._id && (
                  <div className="mt-4 border-t pt-3">
                    <Expanded order={order} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* 🔥 Reusable Expanded Section */
const Expanded = ({ order }) => (
  <div className="grid md:grid-cols-2 gap-4 text-sm">
    <div>
      <h3 className="font-semibold mb-1">📍 Address</h3>
      <p className="text-gray-500 dark:text-gray-300">
        {order.address?.address || "N/A"}
      </p>
    </div>

    <div>
      <h3 className="font-semibold mb-1">🛒 Items</h3>
      <div className="space-y-2">
        {order.items.map((item, i) => (
          <div
            key={i}
            className="flex justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded"
          >
            <span>
              {item.title} × {item.qty}
            </span>
            <span>₹{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Orders;