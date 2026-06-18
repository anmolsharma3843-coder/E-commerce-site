import { motion } from "framer-motion";

const StepIndicator = ({ step }) => {
  const steps = ["Checkout", "Payment", "Review"];

  return (
    <div className="flex items-center justify-between mb-8 relative">
      {steps.map((label, index) => {
        const current = index + 1;
        const isActive = current === step;
        const isCompleted = current < step;

        return (
          <div
            key={label}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* Progress Line */}
            {index < steps.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full h-[3px] bg-gray-300 dark:bg-gray-700">
                <motion.div
                  className="h-full bg-green-600 rounded-full"
                  initial={false}
                  animate={{
                    width: isCompleted ? "100%" : "0%",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                />
              </div>
            )}

            {/* Step Circle */}
            <motion.div
              className={`relative w-10 h-10 flex items-center justify-center rounded-full border-2 z-10 font-semibold
                ${
                  isCompleted
                    ? "bg-green-600 border-green-600 text-white"
                    : isActive
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-gray-200 border-gray-400 text-gray-600 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                }`}
              animate={{
                scale: isActive ? 1.08 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 20,
              }}
            >
              {/* Smooth Active Ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: isActive
                    ? "0 0 0 8px rgba(59,130,246,0.20)"
                    : "0 0 0 0px rgba(59,130,246,0)",
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                }}
              />

              {isCompleted ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                >
                  ✓
                </motion.span>
              ) : (
                current
              )}
            </motion.div>

            {/* Label */}
            <motion.span
              className={`mt-3 text-sm font-medium ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              animate={{
                y: isActive ? -3 : 0,
                opacity: isActive ? 1 : 0.8,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              {label}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;