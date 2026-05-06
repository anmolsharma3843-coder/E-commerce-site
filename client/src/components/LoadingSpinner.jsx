import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      {/* Creates a circle with a transparent top border and applies a continuous spin animation */}
      <div
        className="h-11 w-11 animate-spin rounded-full border-4 border-solid border-gray-800 border-t-transparent mt-3"
        data-testid="loading-spinner"
      />
    </div>
  );
};

export default LoadingSpinner;