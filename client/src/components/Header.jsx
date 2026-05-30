import { FiSearch } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, setProfileImage } from "../store/authSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { cartActions } from "../store/cartSlice";
import { useRef } from "react";

const Header = () => {
  const cartitem = useSelector((state) => state.cart);
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  // DEBOUNCE SEARCH
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearching(false);
      setDebouncedQuery("");
      return;
    }

    setSearching(true);

    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setSearching(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    }
  }, [searchQuery]);

  // SEARCH NAVIGATION
  useEffect(() => {
    const query = debouncedQuery.trim();

    if (query.length > 0) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    }
  }, [debouncedQuery, navigate]);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5100/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(cartActions.clearCart());
        dispatch(logout());

        toast.success(data.message);

        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleProfileImageUpload = (e) => {
  const file = e.target.files[0];

  if (!file) return;
  

  const imageUrl = URL.createObjectURL(file);
  dispatch(setProfileImage(imageUrl))

  toast.success("Profile image selected");
};

  const toggleTheme = () => {
    const next = !darkMode;

    setDarkMode(next);

    document.documentElement.classList.toggle("dark", next);

    localStorage.setItem("theme", next ? "dark" : "light");
  };


  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-950 border-b border-gray-300 dark:border-gray-800 shadow-sm">

        <div className="flex items-center justify-between px-4 md:px-8 py-3">

          {/* LOGO */}
          <Link to="/" aria-label="Go to homepage" className="flex items-center gap-2" >
            <div className="w-10 h-auto rounded-full bg-linear-to-r from-purple-700 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg">
              <img src="/logo.svg" alt="logo" className=" rounded-full object-cover " />
            </div>

            <span className="text-xl font-bold text-gray-900 dark:text-white">
              UrbanMela
            </span>
          </Link>

          {/* NAV */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {["Home", "Women", "Men", "Shop"].map((item) => (
              <NavLink
                key={item}
                to={
                  item === "Home"
                    ? "/"
                    : item === "Shop"
                      ? "/shop"
                      : `/category/${item}`
                }
                className={({ isActive }) =>
                  `pb-1 border-b-2 transition-colors duration-200 ${isActive
                    ? "border-purple-700 text-purple-700 dark:text-purple-400"
                    : "border-transparent text-gray-800 dark:text-gray-200 md:hover:text-purple-700 dark:md:hover:text-purple-400"
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
              className="hidden md:flex items-center bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-full focus-within:ring-2 focus-within:ring-purple-600 transition"
            >
              <label htmlFor="search" className="sr-only">
                Search products
              </label>

              <div className="mr-2">
                {searching ? (
                  <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiSearch className="text-gray-700 dark:text-gray-300" />
                )}
              </div>

              <input
                id="search"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-40 text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400"
              />
            </form>

            {/* ❤️ Wishlist */}
            <button
              onClick={() => navigate("/wishlist")}
              aria-label="Wishlist"
              className="hidden sm:block"
            >
              <FaHeart
                size={20}
                className="text-gray-800 dark:text-gray-200 md:hover:text-red-500 transition"
              />
            </button>

            {/* 🛒 CART */}
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative text-gray-800 dark:text-gray-200"
            >
              {cartitem.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-700 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full shadow">
                  {cartitem.length}
                </span>
              )}

              <IoCartOutline size={23} />
            </Link>

            {/* 🌙 THEME */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-gray-800 dark:text-gray-200 md:hover:text-purple-700 dark:md:hover:text-purple-400 transition"
            >
              {darkMode ? (
                <MdLightMode size={22} />
              ) : (
                <MdDarkMode size={22} />
              )}
            </button>

            {/* USER */}
           {user ? (
  <button
    onClick={() => setMobileMenuOpen(true)}
    aria-label="Open profile menu"
    className="flex items-center gap-2 sm:px-0.5 sm:py-0.5 rounded-full bg-gray-200 dark:bg-gray-800 md:hover:bg-purple-700  md:transition"
  >
    <div className="w-8 h-8 rounded-full overflow-hidden bg-purple-700 text-white flex items-center justify-center font-semibold">
     {user?.profileImage ? (
  <img
    src={user.profileImage}
    alt={user.username}
    className="w-full h-full object-cover"
  />
) : (
  user.username?.charAt(0).toUpperCase()
)}
    </div>

    {/* <span className="hidden sm:block text-sm text-gray-800 dark:text-gray-200">
      {user.username.charAt(0).toUpperCase()+user.username.slice(1)}
    </span> */}
  </button>
) : (
  <Link
    to="/signin"
    aria-label="Login"
    className="text-gray-800 dark:text-gray-200 md:hover:text-purple-700 dark:md:hover:text-purple-400 transition"
  >
    <CiUser size={22} />
  </Link>
)}
          </div>
        </div>

        {/* MOBILE NAV */}
        <div className="md:hidden flex justify-around py-3 border-t border-gray-300 dark:border-gray-800 text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950">
          {["Home", "Women", "Men", "Shop"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : item === 'Shop' ? '/shop' : `/category/${item}`}
              className="md:hover:text-purple-700 dark:md:hover:text-purple-400 transition"
            >
              {item}
            </Link>
          ))}
        </div>
      </header>

      {/* 📱 DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 z-60 shadow-xl transform transition-transform duration-300 font-semibold dark:font-medium
        ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >

        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-800">
          <span className="font-bold text-lg">
            {user?.username.charAt(0).toUpperCase()+user?.username.slice(1)}
          </span>

          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="text-lg md:hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>

        <button
          onClick={() => {navigate("/orders"),setMobileMenuOpen(false)}}
          className="block w-full text-left px-4 py-3 md:hover:bg-gray-100 dark:md:hover:bg-gray-800 transition"
        >
          Orders
        </button>

        <button
        onClick={() => {navigate("/wishlist"),setMobileMenuOpen(false)}}
          className="block w-full text-left px-4 py-3 md:hover:bg-gray-100 dark:md:hover:bg-gray-800 transition"
        >
          Wishlist
        </button>

        <div className="border-t border-gray-300 dark:border-gray-800 my-2" />
        <button
  onClick={() => fileInputRef.current?.click()}
  className="block w-full text-left px-4 py-3 md:hover:bg-gray-100 dark:md:hover:bg-gray-800 transition"
>
  Upload Profile Image
</button>

<input
  type="file"
  accept="image/*"
  ref={fileInputRef}
  onChange={handleProfileImageUpload}
  className="hidden"
/>

        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-3 text-red-600 md:hover:bg-red-50 dark:md:hover:bg-red-900/20 transition"
        >
          Logout
        </button>
      </div>

      {/* OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;