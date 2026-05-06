const AnimatedStep = ({ children, step, currentStep }) => {
  return (
    <div
      className={`
        transition-all duration-700 ease-in-out
        ${step === currentStep ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 absolute"}
      `}
    >
      {children}
    </div>
  );
};
export default AnimatedStep;