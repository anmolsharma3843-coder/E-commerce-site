import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Women's Dresses",
    slug: "Women",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDxdogOWUXPCtU-x5mXLL2pNmOy-xZCGEsgg&s",
  },
  {
    id: 2,
    title: "Men's Jackets",
    slug: "Men",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8bKK4sWcK_qeBoNOGCTr6rMm4GgKGgvqD0Q&s",
  },
  {
    id: 3,
    title: "Tops & Blouses",
    slug: "Women",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMnlETyAHOtAVc6iwUyG_LNXy_qTW0_695ZQ&s",
  },
  {
    id: 4,
    title: "Denim Collection",
    slug: "Shop",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7W4Oa_-PdiyvkdxqQY0OWCXJA0yyszrsCIw&s",
  },
];

const Products = () => {
  const navigate = useNavigate();

  const handleCategory = (slug) => {
    navigate(`/category/${slug}`);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-14 px-4 md:px-10 transition-colors duration-300">

      {/* HEADER */}
      <div className="flex items-end justify-between mb-10">

        <div>
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 mb-4">
            <span className="text-xs font-semibold tracking-wide text-purple-700 dark:text-purple-300 uppercase">
              Trending Collections
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Featured Categories
          </h2>

          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-3 max-w-lg">
            Discover curated fashion collections designed for every style and season.
          </p>
        </div>

        <button
          onClick={() => navigate("/shop")}
          className="
            hidden md:flex
            items-center gap-2
            px-5 py-2.5
            rounded-xl
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-700
            text-sm font-semibold
            text-gray-800 dark:text-gray-100
            shadow-sm
            hover:shadow-md
            hover:-translate-y-0.5
            transition-all duration-300
            cursor-pointer
          "
        >
          View All
          <span>→</span>
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">

        {categories.map((cat) => (
          <div
            key={cat.id}
            role="button"
            tabIndex={0}
            onClick={() => handleCategory(cat.slug)}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              bg-white dark:bg-gray-900
              border border-gray-200 dark:border-gray-800
              shadow-sm
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-500
              cursor-pointer
            "
          >

            {/* IMAGE */}
            <div className="aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-gray-800">

              <img
                src={cat.img}
                alt={cat.title}
                loading="lazy"
                decoding="async"
                width="400"
                height="533"
                className="
                  w-full
                  h-full
                  object-cover
                  group-hover:scale-110
                  transition-transform
                  duration-700
                "
              />
            </div>

            {/* OVERLAY */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/85
                via-black/20
                to-transparent
              "
            />

            {/* CONTENT */}
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-5">

              {/* SMALL TAG */}
              <div
                className="
                  inline-flex
                  items-center
                  px-3 py-1
                  rounded-full
                  bg-white/15
                  backdrop-blur-md
                  border border-white/20
                  text-[10px]
                  md:text-xs
                  font-medium
                  text-white
                  mb-3
                "
              >
                New Collection
              </div>

              {/* TITLE */}
              <h3
                className="
                  text-white
                  text-sm
                  md:text-xl
                  font-bold
                  leading-snug
                  drop-shadow-md
                "
              >
                {cat.title}
              </h3>

              {/* HOVER TEXT */}
              <div
                className="
                  mt-3
                  flex items-center gap-2
                  text-xs md:text-sm
                  text-gray-100
                  opacity-0
                  translate-y-2
                  group-hover:opacity-100
                  group-hover:translate-y-0
                  transition-all
                  duration-300
                "
              >
                <span>Explore Collection</span>
                <span>→</span>
              </div>
            </div>

            {/* HOVER BORDER */}
            <div
              className="
                absolute inset-0
                rounded-3xl
                ring-0
                group-hover:ring-2
                ring-purple-400/60
                transition
              "
            />
          </div>
        ))}
      </div>

      {/* MOBILE BUTTON */}
      <div className="mt-8 flex justify-center md:hidden">
        <button
          onClick={() => navigate("/shop")}
          className="
            px-6 py-3
            rounded-xl
            bg-purple-600
            hover:bg-purple-500
            text-white
            font-semibold
            shadow-lg
            transition-all
            duration-300
          "
        >
          View All Categories
        </button>
      </div>
    </section>
  );
};

export default Products;