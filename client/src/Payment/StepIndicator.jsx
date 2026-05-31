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
              <div className="absolute top-4 left-1/2 w-full h-[2px] bg-gray-300">
                <motion.div
                  className="h-full bg-green-600"
                  initial={{ width: "0%" }}
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

            {/* Circle */}
            <motion.div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 z-10 font-semibold
                ${
                  isCompleted
                    ? "bg-green-600 border-green-600 text-white"
                    : isActive
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-gray-200 border-gray-400 text-gray-600"
                }`}
              animate={{
                scale: isActive ? 1.15 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
            >
              {isCompleted ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  ✓
                </motion.span>
              ) : (
                current
              )}
            </motion.div>

            {/* Active Pulse Ring */}
            {isActive && (
              <motion.div
                className="absolute w-10 h-10 rounded-full border-2 border-blue-500"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{
                  scale: 1.5,
                  opacity: 0,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                }}
              />
            )}

            {/* Label */}
            <motion.span
              className={`mt-2 text-sm font-medium ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 dark:text-gray-100"
              }`}
              animate={{
                y: isActive ? -2 : 0,
              }}
              transition={{ duration: 0.2 }}
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