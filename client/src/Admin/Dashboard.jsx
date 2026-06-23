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

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header
          className="
          sticky top-0 z-40
          bg-white/80 dark:bg-gray-900/80
          backdrop-blur-md
          border-b border-gray-200 dark:border-gray-800
          px-4 md:px-6
          py-3
        "
        >
          <div className="flex items-center justify-between">
            {/* Title */}
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                Admin Dashboard
              </h1>

              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                Manage products, users and orders
              </p>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="
              flex items-center gap-2
              px-4 py-2
              rounded-xl
              bg-gray-100 dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              text-gray-700 dark:text-gray-200
              hover:scale-105
              transition-all
            "
            >
              {dark ? (
                <>
                  <FiSun size={18} />
                  Light
                </>
              ) : (
                <>
                  <FiMoon size={18} />
                  Dark
                </>
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main
          className="
          flex-1
          overflow-y-auto
          p-4 md:p-6 lg:p-8
        "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;