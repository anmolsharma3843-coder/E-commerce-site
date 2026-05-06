import { useNavigate } from "react-router-dom";

const CategoryStrip = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Women",
      img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
    },
    {
      name: "Men",
      img: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    },
    {
      name: "Dresses",
      img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03",
      link: "/category/Women",
    },
    {
      name: "Jackets",
      img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
      link: "/category/Men",
    },
    {
      name: "Kurti",
      img: "https://m.media-amazon.com/images/I/71I53evweVL._SY879_.jpg",
      link: "/category/Women",
    },
     {
      name: "Jeans",
      img: "https://m.media-amazon.com/images/I/71I53evweVL._SY879_.https://m.media-amazon.com/images/I/71Q7GVOcCRL._AC_UL480_FMwebp_QL65_.jpg",
      link: "/category/Men",
    },
    {
      name: "Saree",
      img: "https://m.media-amazon.com/images/I/61BpGC5FXeL._SX679_.jpg",
      link: "/category/Women",
    },
    {
      name: "Shirt",
      img: "https://m.media-amazon.com/images/I/61H1HxfTAUL._SY741_.jpg",
      link: "/category/Men",
    },
     {
      name: "Shorts",
      img: "https://m.media-amazon.com/images/I/71qJNrZhd1L._SY741_.jpg",
      link: "/category/Men",
    },
     {
      name: "Night Dress",
      img: "https://m.media-amazon.com/images/I/51KxsuYvXGL._SX679_.jpg",
      link: "/category/Women",
    },
    {
      name: "Baggy Pants",
      img: "https://m.media-amazon.com/images/I/51ugSQyrOiL._SY879_.jpg",
      link: "/category/Women",
    },
    {
      name: "Track Pants",
      img: "https://m.media-amazon.com/images/I/410AMn8KAUL._SY741_.jpg",
      link: "/category/Men",
    },
    {
      name: "Formal Pants",
      img: "https://m.media-amazon.com/images/I/5152ghnzPJL._SX679_.jpg",
      link: "/category/Men",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-4 px-4 overflow-x-auto flex gap-3 md:gap-6 shadow-sm">
  {categories.map((cat) => (
    <button
      key={cat.name}
      onClick={() => navigate(cat.link || `/category/${cat.name}`)}
      className="min-w-[90px] flex flex-col items-center group focus:outline-none"
      aria-label={`Go to ${cat.name} category`}
    >
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 group-hover:border-purple-500 transition">
        <img
          src={cat.img}
          alt={`${cat.name} category`}
          className="w-full h-full object-cover group-hover:scale-110 transition"
        />
      </div>

      <p className="text-sm mt-2 text-gray-800 dark:text-gray-200 group-hover:text-purple-600">
        {cat.name}
      </p>
    </button>
  ))}
</div>
  );
};

export default CategoryStrip;