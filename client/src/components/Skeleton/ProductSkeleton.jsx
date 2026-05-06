import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="min-w-50 max-w-55 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 animate-pulse">
      
      {/* Image */}
      <div className="w-full h-56 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>

      {/* Title */}
      <div className="mt-3 space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      </div>

      {/* Price */}
      <div className="mt-3 h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>

      {/* Rating */}
      <div className="mt-2 h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
    </div>
  );
};

export default ProductSkeleton;