import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate("/shop");
  }, [navigate]);

  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden bg-gray-200 dark:bg-gray-900">
      
      {/* BACKGROUND IMAGE */}
      <img
        src="/banner.webp"
        alt="Big Fashion Sale Banner"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        width="1920"
        height="1080"
      />

      {/* ACCESSIBLE OVERLAY */}
      <div className="absolute inset-0 bg-black/65 dark:bg-black/75" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-10">

        {/* BADGE */}
        <div className="mb-4">
          <span
            className="
              inline-flex items-center
              px-4 py-1.5
              rounded-full
              bg-yellow-400
              text-black
              text-sm
              font-semibold
              shadow
            "
          >
            Limited Time Offer
          </span>
        </div>

        {/* TITLE */}
        <h1
          className="
            text-4xl
            md:text-6xl
            font-extrabold
            leading-tight
            text-white
            max-w-3xl
            drop-shadow-lg
          "
        >
          Big Fashion Sale 🔥
        </h1>

        {/* DESCRIPTION */}
        <p
          className="
            mt-4
            text-base
            md:text-lg
            text-gray-100
            max-w-xl
            leading-relaxed
          "
        >
          Upgrade your wardrobe with premium styles, trending collections,
          and unbeatable offers up to 70% OFF.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4 mt-8">

          <button
            onClick={handleNavigate}
            aria-label="Shop Now"
            className="
              px-7 py-3
              bg-yellow-400
              text-black
              rounded-xl
              font-semibold
              shadow-lg
              hover:bg-yellow-300
              focus:outline-none
              focus:ring-4
              focus:ring-yellow-300/50
              transition-all duration-300
              hover:scale-105
              cursor-pointer
            "
          >
            Shop Now
          </button>

          <button
            onClick={handleNavigate}
            aria-label="Explore Collections"
            className="
              px-7 py-3
              rounded-xl
              border border-white/40
              bg-white/10
              backdrop-blur-md
              text-white
              font-semibold
              hover:bg-white/20
              focus:outline-none
              focus:ring-4
              focus:ring-white/30
              transition-all duration-300
              cursor-pointer
            "
          >
            Explore Collections
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;