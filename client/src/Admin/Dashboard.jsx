import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
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
    <div className="flex h-screen overflow-hidden 
      bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto">

        {/* Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg text-sm font-medium
            bg-white dark:bg-gray-800 
            text-gray-700 dark:text-gray-200
            border dark:border-gray-700 transition"
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;