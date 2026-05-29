import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" bg-white dark:bg-[#0f172a] border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-300 " >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
        {/* TOP SECTION */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 " >
          {/* BRAND */}
          <div> <h2 className=" text-3xl font-black text-gray-900 dark:text-white tracking-tight " >
            FashionHub
          </h2>
            <p className=" mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400 " >
              Your one-stop destination for trendy clothing
              and accessories. Discover modern fashion with
              premium quality and unbeatable prices.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-3 mt-6">
              <a href="/" className=" w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1e293b] flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-indigo-500 transition-all duration-300 " >
                <FaFacebookF />
              </a>
              <a href="/" className=" w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1e293b] flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300 " >
                <FaInstagram />
              </a>
              <a href="/" className=" w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1e293b] flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-300 " >
                <FaTwitter />
              </a>

              <a href="/" className=" w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1e293b] flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 " >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/" className="hover:text-indigo-500 transition" > Home </Link>
              <Link to="/shop" className="hover:text-indigo-500 transition" > Shop </Link>
              <Link to="/sale" className="hover:text-indigo-500 transition" > Sale </Link>
              <Link to="/contact" className="hover:text-indigo-500 transition" > Contact </Link>
            </div>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">
              Categories
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/category/Women" className="hover:text-pink-500 transition" > Women Fashion </Link>
              <Link to="/category/Men" className="hover:text-indigo-500 transition" > Men Fashion </Link>
              <Link to="/shop" className="hover:text-indigo-500 transition" > New Arrivals </Link>
              <Link to="/shop" className="hover:text-indigo-500 transition" > Trending Products </Link>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">
              Stay Updated
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-6">
              Subscribe to get special offers, free giveaways,
              and new arrivals updates.
            </p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className=" pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 " >
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} UrbanMela. All
            rights reserved.
          </p>

          <div className="flex items-center gap-5 text-sm">
            <Link to="/" className="hover:text-indigo-500 transition" > Privacy Policy </Link>
            <Link to="/" className="hover:text-indigo-500 transition" > Terms </Link>
            <Link to="/" className="hover:text-indigo-500 transition" > Support </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;