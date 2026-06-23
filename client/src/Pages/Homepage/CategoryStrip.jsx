import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import women from "../../assets/Images/women.webp";
import men from "../../assets/Images/men.webp";
import dresses from "../../assets/Images/dresses.webp";
import kurti from "../../assets/Images/kurti.webp";
import saree from "../../assets/Images/Saree.webp";
import shirts from "../../assets/Images/shirts.webp";
import shorts from "../../assets/Images/Shorts.webp";
import NightDress from "../../assets/Images/NightDress.webp";
import BaggyPants from "../../assets/Images/BaggyPants.webp";
import Trackpants from "../../assets/Images/TrackPants.webp";
import formalPants from "../../assets/Images/formalPants.webp";

const categories = [
  {
    id: 1,
    name: "Women",
    img: women,
  },
  {
    id: 2,
    name: "Men",
    img: men,
  },
  {
    id: 3,
    name: "Dresses",
    img: dresses,
    link: "/category/Women",
  },
  {
    id: 4,
    name: "Jackets",
    img: shorts,
    link: "/category/Men",
  },
  {
    id: 5,
    name: "Kurti",
    img: kurti,
    link: "/category/Women",
  },
  {
    id: 6,
    name: "Jeans",
    img: kurti,
    link: "/category/Men",
  },
  {
    id: 7,
    name: "Saree",
    img: saree,
    link: "/category/Women",
  },
  {
    id: 8,
    name: "Shirt",
    img: shirts,
    link: "/category/Men",
  },
  {
    id: 9,
    name: "Shorts",
    img: shorts,
    link: "/category/Men",
  },
  {
    id: 10,
    name: "Night Dress",
    img: NightDress,
    link: "/category/Women",
  },
  {
    id: 11,
    name: "Baggy Pants",
    img: BaggyPants,
    link: "/category/Women",
  },
  {
    id: 12,
    name: "Track Pants",
    img: Trackpants,
    link: "/category/Men",
  },
  {
    id: 13,
    name: "Formal Pants",
    img: formalPants,
    link: "/category/Men",
  },
];

const CategoryStrip = () => {
  const navigate = useNavigate();

  // ✅ Memoized navigation function
  const handleNavigate = useCallback(
    (link, name) => {
      navigate(link || `/category/${name}`);
    },
    [navigate]
  );

  return (
    <section className="bg-white dark:bg-gray-900 py-5 px-4 shadow-sm">
      <div className="flex gap-2 md:gap-6 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() =>
              handleNavigate(cat.link, cat.name)
            }
            aria-label={`Go to ${cat.name} category`}
            className=" w-22.5 shrink-0 flex flex-col items-center group focus:outline-none "
          >
            {/* IMAGE */}
           <div
  className="
    w-16 h-16
    md:w-20 md:h-20
    rounded-full
    overflow-hidden
    border-2 border-gray-300
    dark:border-gray-600
    md:group-hover:border-purple-500
    md:group-hover:shadow-lg
    transition-transform duration-300
  "
>
  <img
    src={cat.img}
    alt={`${cat.name} category`}
    loading="lazy"
    decoding="async"
    width="80"
    height="80"
    className="
      w-full h-full
      object-cover
      md:group-hover:scale-110
      transition-transform duration-300
    "
  />
</div>
            {/* CATEGORY NAME */}
            <p className=" text-sm mt-2 text-center font-medium text-gray-800 dark:text-gray-200 md:group-hover:text-purple-600 dark:md:group-hover:text-purple-400 transition-colors duration-300 line-clamp-1 "
            >
              {cat.name}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryStrip;