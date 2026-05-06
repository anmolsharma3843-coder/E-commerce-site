import { FiSearch } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const cartitem = useSelector((state) => state.cart) || [];
  const user = useSelector((store) => store.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5100/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(logout());
        toast.success(data.message);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">

        <div className="flex items-center justify-between px-4 md:px-8 py-3">

          {/* LOGO */}
          <Link to="/" aria-label="Go to homepage" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 text-white flex items-center justify-center font-bold">
              S
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              ShopX
            </span>
          </Link>

          {/* NAV */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {["Home", "Women", "Men", "Shop"].map((item) => (
              <NavLink
                key={item}
                to={item === "Home" ? "/" : `/category/${item}`}
                className={({ isActive }) =>
                  `pb-1 border-b-2 ${
                    isActive
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-700 dark:text-gray-300 hover:text-purple-600"
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4 md:gap-6">

            {/* SEARCH */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full focus-within:ring-2 focus-within:ring-purple-500"
            >
              <label htmlFor="search" className="sr-only">
                Search products
              </label>
              <FiSearch className="mr-2 text-gray-500" />
              <input
                id="search"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-40 text-gray-700 dark:text-white"
              />
            </form>

            {/* ❤️ Wishlist */}
            <button
              onClick={() => navigate("/wishlist")}
              aria-label="Wishlist"
              className="hidden sm:block"
            >
              <FaHeart size={20} className="text-gray-700 dark:text-gray-300 hover:text-red-500" />
            </button>

            {/* 🛒 CART */}
            <Link to="/cart" aria-label="Cart" className="relative dark:text-gray-200">
              {cartitem.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full ">
                  {cartitem.length}
                </span>
              )}
              <IoCartOutline size={22} />
            </Link>

            {/* 🌙 THEME */}
            <button onClick={toggleTheme} aria-label="Toggle theme" className="dark:text-gray-200">
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>

            {/* USER */}
            {user ? (
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open profile menu"
                className="flex items-center gap-2 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800"
              >
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-sm text-gray-700 dark:text-gray-200">
                  {user.username}
                </span>
              </button>
            ) : (
              <Link to="/signin" aria-label="Login">
                <CiUser size={20} />
              </Link>
            )}
          </div>
        </div>

        {/* MOBILE NAV */}
        <div className="md:hidden flex justify-around py-3 border-t text-sm text-gray-700 dark:text-gray-300">
          {["Home", "Women", "Men", "Shop"].map((item) => (
            <Link key={item} to={item === "Home" ? "/" : `/category/${item}`}>
              {item}
            </Link>
          ))}
        </div>
      </header>

      {/* 📱 DRAWER (OUTSIDE HEADER) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 z-60 shadow-lg transform transition-transform duration-300
        ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between p-4 border-b dark:border-gray-700">
          <span className="font-semibold">{user?.username}</span>
          <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">✕</button>
        </div>

        <button onClick={() => navigate("/orders")} className="block w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
          Orders
        </button>
        <button onClick={() => navigate("/wishlist")} className="block w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800">
          Wishlist
        </button>

        <div className="border-t dark:border-gray-700 my-2" />

        <button onClick={handleLogout} className="block w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
          Logout
        </button>
      </div>

      {/* OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;