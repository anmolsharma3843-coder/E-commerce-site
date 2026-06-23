import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  };

  return (
    <div
      className="
      flex min-h-screen
      bg-gray-100 dark:bg-gray-950
      transition-colors duration-300
    "
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header
          className="
          sticky top-0 z-30
          bg-white/80 dark:bg-gray-900/80
          backdrop-blur-md
          border-b border-gray-200 dark:border-gray-800
          px-4 sm:px-6
          py-3
        "
        >
          <div className="flex items-center justify-between">
            {/* Title */}
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                Admin Dashboard
              </h1>

              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Manage products, orders and users
              </p>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="
                flex items-center justify-center
                w-10 h-10
                rounded-xl
                bg-gray-100 dark:bg-gray-800
                text-gray-700 dark:text-gray-200
                border border-gray-200 dark:border-gray-700
                hover:scale-105
                transition
              "
            >
              {dark ? (
                <FiSun className="text-lg" />
              ) : (
                <FiMoon className="text-lg" />
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main
          className="
          flex-1
          p-3
          sm:p-4
          md:p-6
          overflow-y-auto
        "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;