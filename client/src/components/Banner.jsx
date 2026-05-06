const Banner = () => {
  return (
    <div className="px-4 md:px-10 py-10">
      <div className="bg-linear-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">
  Mega Sale ⚡
</h2>

<p className="mt-2 text-gray-100">
  Limited time offer
</p>
</div>
<button
  className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100"
  aria-label="Explore sale"
>
  Explore
</button>
      </div>
    </div>
  );
};

export default Banner;