const dealsData = [
  {
    id: 1,
    image: "https://m.media-amazon.com/images/I/51hzkq79urL._SY879_.jpg",
    title: "Wireless Headphones",
    discount: "Up to 50% OFF",
    tag: "HOT",
  },
  {
    id: 2,
    image: "https://m.media-amazon.com/images/I/61l5ODVc4yL._SX679_.jpg",
    title: "Men's Sneakers",
    discount: "Flat 40% OFF",
    tag: "SALE",
  },
  {
    id: 3,
    image: "https://m.media-amazon.com/images/I/51JtGs04X7L._SY741_.jpg",
    title: "Smart Watch",
    discount: "Up to 30% OFF",
    tag: "TRENDING",
  },
  {
    id: 4,
    image: "https://m.media-amazon.com/images/I/41cJjm7awIL.jpg",
    title: "Women's Handbag",
    discount: "Min 60% OFF",
    tag: "HOT",
  },
];

const Deals = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-950 px-4 md:px-10 pt-5 transition-colors duration-300">

      {/* HEADER */}
      <div className="flex items-end justify-between mb-10">

        <div>
          {/* SMALL BADGE */}
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <span className="text-xs font-semibold tracking-wide uppercase text-red-700 dark:text-red-300">
              Limited Offers
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Deals of the Day
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-lg">
            Grab today’s best offers on trending products before the sale ends.
          </p>
        </div>

        {/* VIEW ALL */}
        <button aria-label="View all deals" className=" hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-800 dark:text-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer " >
          View All
          <span>→</span>
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {dealsData.map((item) => (
          <div key={item.id} className=" group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer " >

            {/* BADGE */}
            <span className=" absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-semibold tracking-wide shadow-md " >
              {item.tag}
            </span>

            {/* IMAGE */}
            <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800">

              <img src={item.image} alt={item.title} width="300" height="300" loading="lazy" className=" w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700 " />

              {/* OVERLAY */}
              <div className=" absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 " />
            </div>

            {/* CONTENT */}
            <div className="p-4">

              {/* PRODUCT TITLE */}
              <h3 className=" text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-relaxed min-h-12 " >
                {item.title}
              </h3>

              {/* DISCOUNT */}
              <div className="mt-3 flex items-center justify-between">
                <p
                  className="
                    text-sm
                    font-bold
                    text-green-700 dark:text-green-400
                  "
                >
                  {item.discount}
                </p>

                <span className=" text-xs font-medium text-gray-500 dark:text-gray-400 " >
                  Shop Now →
                </span>
              </div>
            </div>

            {/* HOVER RING */}
            <div className=" absolute inset-0 rounded-3xl ring-0 group-hover:ring-2 ring-purple-400/50 transition " />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Deals;