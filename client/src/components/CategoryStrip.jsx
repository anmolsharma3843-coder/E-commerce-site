import { useNavigate } from "react-router-dom";
import women from '../assets/Images/women.jpeg'
import men from '../assets/Images/men.jpeg'
import dresses from '../assets/Images/dresses.jpeg'
import kurti from '../assets/Images/kurti.jpg'
import saree from '../assets/Images/saree.jpg'
import shirts from '../assets/Images/shirts.jpg'
import shorts from '../assets/Images/Shorts.jpg'
import NightDress from '../assets/Images/NightDress.jpg'
import BaggyPants from '../assets/Images/BaggyPants.jpg'
import Trackpants from '../assets/Images/TrackPants.jpg'
import formalPants from '../assets/Images/formalPants.jpg'

const CategoryStrip = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Women",
      img: women,
    },
    {
      name: "Men",
      img: men,
    },
    {
      name: "Dresses",
      img: dresses,
      link: "/category/Women",
    },
    {
      name: "Jackets",
      img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
      link: "/category/Men",
    },
    {
      name: "Kurti",
      img: kurti,
      link: "/category/Women",
    },
     {
      name: "Jeans",
      img: kurti,
      link: "/category/Men",
    },
    {
      name: "Saree",
      img: saree,
      link: "/category/Women",
    },
    {
      name: "Shirt",
      img: shirts,
      link: "/category/Men",
    },
     {
      name: "Shorts",
      img: shorts,
      link: "/category/Men",
    },
     {
      name: "Night Dress",
      img: NightDress,
      link: "/category/Women",
    },
    {
      name: "Baggy Pants",
      img: BaggyPants,
      link: "/category/Women",
    },
    {
      name: "Track Pants",
      img: Trackpants,
      link: "/category/Men",
    },
    {
      name: "Formal Pants",
      img: formalPants,
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