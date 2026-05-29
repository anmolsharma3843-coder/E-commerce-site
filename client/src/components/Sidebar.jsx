import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaBox,
  FaFileInvoice,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileImage, setProfileImage] = useState(null);
useEffect(() => {
  const savedImage = localStorage.getItem("profileImage");

  if (savedImage) {
    setProfileImage(savedImage);
  }

  const handleStorageChange = () => {
    const updatedImage =
      localStorage.getItem("profileImage");

    setProfileImage(updatedImage);
  };

  window.addEventListener(
    "storage",
    handleStorageChange
  );

  return () => {
    window.removeEventListener(
      "storage",
      handleStorageChange
    );
  };
}, []);
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5100/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      localStorage.removeItem("theme");

      if (response.ok) {
        dispatch(logout());
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menu = [
    { name: "Dashboard", path: "/admin", icon: <FaHome /> },
    { name: "Add Product", path: "/admin/add-product", icon: <FaPlus /> },
    { name: "Products", path: "/admin/products", icon: <FaBox /> },
    { name: "Orders", path: "/admin/orders", icon: <FaFileInvoice /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
  ];

  return (
    <aside
      className="shrink-0 group flex flex-col justify-between
  h-screen w-24 md:hover:w-64
  bg-white dark:bg-linear-to-b dark:from-[#0f172a] dark:via-[#111827] dark:to-[#020617]
  text-gray-700 dark:text-gray-300
  shadow-xl transition-all duration-300 ease-in-out"
    >
      {/* Logo */}
      <div className="flex items-center gap-4 px-4 py-6">
        <div className="w-9 h-9 bg-gray-200 dark:bg-gray-600 rounded-full overflow-clip shrink-0">
          <img src={profileImage} alt="Admin Profile" className="w-full h-full object-cover"/>
        </div>

        <span className="text-lg font-semibold opacity-0 md:group-hover:opacity-100 transition whitespace-nowrap">
        Anmol
        </span>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-3 px-3">
        {menu.map((item, i) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={i}
              to={item.path}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl transition
          ${isActive
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-600/20 dark:text-white"
                  : "md:hover:bg-gray-100 dark:md:hover:bg-white/5 md:hover:text-gray-900 dark:md:hover:text-white"
                }`}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 min-w-10 min-h-10 flex items-center justify-center rounded-lg
            ${isActive
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 dark:bg-white/5"
                  }`}
              >
                {item.icon}
              </div>

              {/* Text */}
              <span className="opacity-0 md:group-hover:opacity-100 transition whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full px-3 py-3 rounded-xl
      bg-red-100 text-red-600 
      dark:bg-red-500/10 dark:text-red-400
      md:hover:bg-red-500 md:hover:text-white transition md:hover:cursor-pointer"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-lg 
        bg-red-200 dark:bg-red-500/20 shrink-0">
            <FaSignOutAlt className="text-lg" />
          </div>

          <span className="opacity-0 md:group-hover:opacity-100 transition whitespace-nowrap">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;