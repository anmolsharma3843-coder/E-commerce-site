

const Hero = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
      <img
        src="/banner.jpeg"
        className="w-full h-full object-cover"
        alt="Banner"
        loading='eager'
         fetchpriority="high"
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Big Fashion Sale 🔥
        </h1>
        <p className="text-white mt-3 text-lg">
          Up to 70% OFF on trending styles
        </p>

        <button className="mt-6 w-fit px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition" aria-label='Shop Now'>
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;