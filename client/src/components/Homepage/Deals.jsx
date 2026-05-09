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
    <section className="px-4 md:px-10 py-10">

      {/* 🔥 Header */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
  Deals of the Day
</h2>

<button
  className="text-sm text-purple-700 dark:text-purple-400 hover:underline"
  aria-label="View all deals"
>
  View All
</button>

      {/* 🔥 Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {dealsData.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300 cursor-pointer"
          >

            {/* 🔥 Badge */}
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10 font-medium">
              {item.tag}
            </span>

            {/* 🔥 Image */}
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-44 object-cover group-hover:scale-110 transition duration-500"
                     width="72"
  height="72"
  loading="lazy"
              />
            </div>

            {/* 🔥 Content */}
            <div className="p-3">
              <p className="text-sm font-medium dark:text-gray-200">
                {item.title}
              </p>

              <p className="text-green-700 dark:text-green-400 font-semibold text-sm mt-1">
                {item.discount}
              </p>
            </div>

            {/* 🔥 Hover Overlay */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-300" />

          </div>
        ))}

      </div>
    </section>
  );
};

export default Deals;