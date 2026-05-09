import React, { useContext, useState } from "react";
import Products from "../components/Homepage/Products";
import Itemspart from "../components/Homepage/Itemspart";

const Main = () => {

  const images = [
    {
      src: "https://source.unsplash.com/1600x600/?fashion,women",
      title: "Women's Collection",
      subtitle: "Trendy & Elegant Styles",
      buttonText: "Shop Women",
    },
    {
      src: "https://source.unsplash.com/1600x600/?men,fashion",
      title: "Men's Collection",
      subtitle: "Style That Defines You",
      buttonText: "Shop Men",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">


          {/* FEATURES */}
          <div className="flex justify-around items-center bg-white dark:bg-gray-800 rounded-xl mx-6 mt-8 p-4 shadow-sm">
            <div className="text-center">
              <p className="font-semibold">🚚 Free Delivery</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">💰 Cash on Delivery</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">🔁 Easy Returns</p>
            </div>
          </div>

      {/* PRODUCTS */}
      <div className="mt-10 px-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Trending Products
        </h2>
        <Products />
      </div>

      <div className="mt-10 px-6 pb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Recommended For You
        </h2>
        <Itemspart />
      </div>
    </div>
  );
};

export default Main;