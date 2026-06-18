import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrders, getTotalRevenue } from "../services/orderService";
import OrderDetailsModal from "./OrderDetailsModal";
import { FaSearch } from "react-icons/fa";
import { fetchAllproduct } from "../services/productApi";
import { FetchUsers, uploadImageApi } from "../services/UsersApi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setProfileImage } from "../store/authSlice";


const Adminpanel = () => {
  const dispatch = useDispatch();
  const [Products, setProducts] = useState([]);
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [Total, setTotal] = useState(0)
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    const productslist = async () => {
      try {
        setLoading(true);

        const [TotalData,productsData, usersData, ordersData] =
          await Promise.all([
            getTotalRevenue(),
            fetchAllproduct(),
            FetchUsers(),
            getAllOrders(),
          ]);

        setProducts(productsData);
        setusers(usersData);
        setOrders(ordersData);
        setTotal(TotalData)
      } catch (error) {
        console.log("fetching error", error);
      } finally {
        setLoading(false);
      }
    };

    productslist();
  }, []);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const data = await uploadImageApi(formData)
      dispatch(setProfileImage(data.profileImage));
      toast.success("Image successffully upload 👌")
    } catch (error) {
      console.log("Upload error:", error);
    }
  };

  // SEARCH FILTER
  const filteredOrders = orders.filter((order) => {
    const user = users.find(
      (u) =>
        u._id.toString() === order.userId.toString()
    );

    return (
      order._id
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      user?.username
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      order.status
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  const stats = [
    { title: "Revenue", value:Total.totalSales
      , icon: "💰", link: '/admin' },
    {
      title: "Orders",
      value: orders.length,
      icon: "🧾",
      link: '/admin/orders'
    },
    { title: "Users", value: users.length, icon: "👥", link: '/admin/users' },
    {
      title: "Products",
      value: Products.length,
      icon: "📦",
      link: '/admin/products'
    },
  ];

  const actions = [
    {
      title: "Add Product",
      link: "/admin/add-product",
      icon: "➕",
    },
    {
      title: "Manage Products",
      link: "/admin/products",
      icon: "📦",
    },
    {
      title: "Orders",
      link: "/admin/orders",
      icon: "🧾",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 🔝 Topbar */}
      <header
        className="bg-white dark:bg-gray-800 
        px-4 sm:px-6 py-3 sm:py-4 
        border-b border-gray-200 dark:border-gray-700 
        flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
      >
        <h1 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
          Dashboard
        </h1>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search orders, users..."
              className="w-full sm:w-56 md:w-72 px-3 py-2 pr-10 text-sm rounded-lg outline-none
              bg-white dark:bg-gray-700
              text-gray-700 dark:text-gray-200
              border border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-indigo-500"
            />

            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Profile */}
          <label className="relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-indigo-500">
              {user?.profileImage ? (<img
                src={
                  `${import.meta.env.VITE_BASE_URL}${user.profileImage}`
                }
                alt="Admin"
                className="w-full h-full object-cover"
              />):
              user.username?.charAt(0).toUpperCase()
}
            </div>
          </label>
        </div>
      </header>

      {/* 📦 Content */}
      <main className="p-4 sm:p-6 space-y-6 sm:space-y-8">
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Loading...
          </div>
        ) : (
          <>
            {/* 📊 Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <Link key={i} to={stat.link}>
                  <div
                    className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-2xl border 
                  border-gray-200 dark:border-gray-700 shadow-sm md:hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="w-10 h-10 flex items-center justify-center 
                      rounded-lg bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300"
                      >
                        {stat.icon}
                      </div>
                    </div>

                    <h2 className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                      {stat.title}
                    </h2>

                    <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
                      {stat.value}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* ⚡ Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {actions.map((card, index) => (
                <Link key={index} to={card.link}>
                  <div
                    className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-2xl border 
                    border-gray-200 dark:border-gray-700 shadow-sm md:hover:shadow-md transition"
                  >
                    <div
                      className="w-12 h-12 flex items-center justify-center 
                      rounded-xl bg-gray-100 dark:bg-gray-700 text-xl"
                    >
                      {card.icon}
                    </div>

                    <h2 className="text-base sm:text-lg font-semibold mt-4 text-gray-800 dark:text-gray-100">
                      {card.title}
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Manage easily →
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* 📦 Orders */}
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl border 
              border-gray-200 dark:border-gray-700 shadow-sm p-4 sm:p-6"
            >
              <h2 className="text-lg font-semibold mb-4 sm:mb-6 text-gray-700 dark:text-gray-200">
                Recent Orders
              </h2>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-500 dark:text-gray-200 border-b text-left">
                      <th className="py-3">Order ID</th>
                      <th>User</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredOrders
                      .slice(0, 5)
                      .map((order) => {
                        const user = users.find(
                          (u) =>
                            u._id.toString() ===
                            order.userId.toString()
                        );

                        return (
                          <tr
                            key={order._id}
                            onClick={() =>
                              setSelectedOrder(order)
                            }
                            className="cursor-pointer border-b md:hover:bg-gray-50 dark:md:hover:bg-gray-700 dark:text-gray-300"
                          >
                            <td className="py-3 font-medium">
                              #{order._id.slice(-5)}
                            </td>

                            <td>
                              {user?.username || "Unknown"}
                            </td>

                            <td className="font-semibold">
                              ₹{order.totalAmount}
                            </td>

                            <td>
                              <span className="px-3 py-1 rounded-full text-xs bg-gray-200 dark:bg-gray-700">
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3">
                {filteredOrders
                  .slice(0, 5)
                  .map((order) => {
                    const user = users.find(
                      (u) =>
                        u._id.toString() ===
                        order.userId.toString()
                    );

                    return (
                      <div
                        key={order._id}
                        onClick={() =>
                          setSelectedOrder(order)
                        }
                        className="p-4 border rounded-xl cursor-pointer 
                        dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white"
                      >
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-sm">
                            #{order._id.slice(-5)}
                          </p>

                          <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700">
                            {order.status}
                          </span>
                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                          {user?.username || "Unknown"}
                        </p>

                        <p className="font-bold mt-2">
                          ₹{order.totalAmount}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <footer className="text-center text-gray-400 dark:text-gray-500 text-sm">
          © {new Date().getFullYear()} Your Company
        </footer>
      </main>

      {/* Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          users={users}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Adminpanel;