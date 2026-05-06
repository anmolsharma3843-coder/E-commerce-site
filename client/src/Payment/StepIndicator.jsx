const StepIndicator = ({ step }) => {
  const steps = ["Checkout", "Payment", "Review"];

  return (
    <div className="flex items-center justify-between mb-6 relative">
      {steps.map((label, index) => {
        const current = index + 1;
        const isActive = current === step;
        const isCompleted = current < step;

        return (
          <div key={label} className="flex-1 flex flex-col items-center relative">
            {/* Circle */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 z-10
                ${isActive ? "bg-blue-600 text-white border-blue-600" : 
                  isCompleted ? "bg-green-600 text-white border-green-600" : 
                  "bg-gray-200 text-gray-600 border-gray-400"}
                transition-colors duration-500 ease-in-out
              `}
            >
              {isCompleted ? "✓" : current}
            </div>

            {/* Label */}
            <span
              className={`mt-2 text-sm font-medium 
                ${isActive ? "text-blue-600" : "text-gray-600 dark:text-gray-100"}
                transition-colors duration-500 ease-in-out
              `}
            >
              {label}
            </span>

            {/* Transition Line */}
            {index < steps.length - 1 && (
              <div className="absolute top-4 left-1/2 w-full h-0.5">
                <div
                  className={`h-0.5 transition-all duration-700 ease-in-out
                    ${isCompleted ? "bg-green-600 w-full" : "bg-gray-300 w-0"}
                  `}
                ></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default StepIndicator;