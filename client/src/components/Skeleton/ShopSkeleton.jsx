const ShopSkeleton = () => {
  return (
     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-60 bg-gray-300 dark:bg-gray-700" />

                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
                </div>
              </div>
            ))}
            </div>
  );
};

export default ShopSkeleton;