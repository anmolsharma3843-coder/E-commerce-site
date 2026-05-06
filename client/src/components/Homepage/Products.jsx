import React, { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const Products = () => {
  const { term, results } = useContext(SearchContext);

  const categories = [
    {
      title: "Women's Dresses",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDxdogOWUXPCtU-x5mXLL2pNmOy-xZCGEsgg&s",
    },
    {
      title: "Men's Jackets",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8bKK4sWcK_qeBoNOGCTr6rMm4GgKGgvqD0Q&s",
    },
    {
      title: "Tops & Blouses",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMnlETyAHOtAVc6iwUyG_LNXy_qTW0_695ZQ&s",
    },
    {
      title: "Denim Collection",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7W4Oa_-PdiyvkdxqQY0OWCXJA0yyszrsCIw&s",
    },
  ];

  return (
    <>
      {term && results ? null : (
        <section className="bg-white dark:bg-gray-900 py-10 px-4 md:px-10 transition">
          
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Featured Categories
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="group relative rounded-lg overflow-hidden shadow-md dark:shadow-gray-800 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay */}
               <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
  <p className="text-white text-lg font-semibold">
    {cat.title}
  </p>
</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Products;