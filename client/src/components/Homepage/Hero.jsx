import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  // ✅ Memoized navigation
  const handleNavigate = useCallback(() => {
    navigate("/shop");
  }, [navigate]);

  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
      
      {/* HERO IMAGE */}
      <img
  src="/banner.webp"
  alt="Banner"
  className="absolute inset-0 w-full h-full object-cover"
  loading="eager"
  fetchPriority="high"
/>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6 md:px-10">
        
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Big Fashion Sale 🔥
        </h1>

        <p className="text-white mt-3 text-base md:text-lg max-w-md">
          Up to 70% OFF on trending styles
        </p>

        <button
          onClick={handleNavigate}
          aria-label="Shop Now"
          className="
            mt-6
            w-fit
            px-6 py-3
            bg-yellow-400
            text-black
            rounded-lg
            font-semibold
            hover:bg-yellow-500
            transition-colors duration-300
            cursor-pointer
          "
        >
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;