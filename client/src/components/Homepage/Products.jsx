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
    <section className="bg-white dark:bg-gray-900 py-12 px-4 md:px-10 transition">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Featured Categories
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Explore trending fashion collections
          </p>
        </div>

        <button className="hidden md:block text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition hover:cursor-pointer" onClick={()=>navigate("/shop")}>
          View All
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
              rounded-2xl
              shadow-md
              dark:shadow-gray-800
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-300
              cursor-pointer
            "
          >
            {/* IMAGE */}
            <div className="aspect-3/4 overflow-hidden">
              <img
                loading="lazy"
                src={cat.img}
                alt={cat.title}
                className="
                  w-full
                  h-full
                  object-cover
                  group-hover:scale-110
                  transition-transform
                  duration-500
                "
              />
            </div>

            {/* GRADIENT OVERLAY */}
            <div
              className="
                absolute
                inset-0
                bg-linear-to-t
                from-black/80
                via-black/20
                to-transparent
              "
            />

            {/* CATEGORY NAME */}
            <div className="absolute bottom-0 left-0 w-full p-4">
              <h3
                className="
                  text-white
                  text-sm
                  md:text-lg
                  font-semibold
                  tracking-wide
                "
              >
                {cat.title}
              </h3>

              <p
                className="
                  text-xs
                  text-gray-200
                  mt-1
                  opacity-0
                  group-hover:opacity-100
                  transition
                "
              >
                Explore Collection →
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;