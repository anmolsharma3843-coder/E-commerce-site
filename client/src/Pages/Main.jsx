import React, { useContext, useState } from "react";
import Products from "../components/Homepage/Products";
import Itemspart from "../components/Homepage/Itemspart";
import { SearchContext } from "../context/SearchContext";

const Main = () => {
  const { term, results } = useContext(SearchContext);

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

      {/* HERO SECTION */}
      {!term && !results && (
        <>
          <div className="relative w-full h-125 overflow-hidden">
            <img
              src={images[currentIndex].src}
              alt=""
              className="w-full h-full object-cover scale-105 transition duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 to-transparent flex flex-col justify-center px-10 md:px-20">
              <h2 className="text-white text-4xl md:text-6xl font-bold">
                {images[currentIndex].title}
              </h2>
              <p className="text-gray-200 text-lg mt-4">
                {images[currentIndex].subtitle}
              </p>

              <button className="mt-6 w-fit bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg transition">
                {images[currentIndex].buttonText}
              </button>
            </div>

            {/* Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/30 p-3 rounded-full"
            >
              ◀
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/30 p-3 rounded-full"
            >
              ▶
            </button>
          </div>

          {/* CATEGORY SECTION */}
        <div className="grid md:grid-cols-2 gap-6 px-6 mt-12">
  {[
    { title: "Men", img: "https://source.unsplash.com/600x400/?men,fashion" },
    { title: "Women", img: "https://source.unsplash.com/600x400/?women,fashion" },
  ].map((cat, i) => (
    <div key={i} className="relative rounded-2xl overflow-hidden group cursor-pointer">
      <img
        src={cat.img}
        className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
        <h2 className="text-3xl font-bold">{cat.title}</h2>
        <button className="mt-3 bg-white text-black px-5 py-2 rounded-md">
          Shop Now
        </button>
      </div>
    </div>
  ))}
</div>

          {/* OFFER BANNER */}
          <div className="mx-6 mt-10 bg-linear-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🔥 Big Sale</h2>
              <p className="text-sm mt-1">Up to 50% off on fashion</p>
            </div>
            <button className="bg-white text-black px-5 py-2 rounded-lg font-semibold">
              Explore
            </button>
          </div>

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
        </>
      )}

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