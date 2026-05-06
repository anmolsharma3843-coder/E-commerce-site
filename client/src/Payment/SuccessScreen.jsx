import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SuccessScreen = () => {
  const [animate, setAnimate] = useState(false);
const navigate= useNavigate()
  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setAnimate(true), 200);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4">
      {/* Animated Checkmark */}
      <div
        className={`w-20 h-20 rounded-full border-4 flex items-center justify-center 
          ${animate ? "bg-green-500 border-green-500 scale-100" : "scale-0"} 
          transition-all duration-700 ease-out`}
      >
        <span className="text-white text-3xl">✓</span>
      </div>

      {/* Success Text */}
      <h2 className="text-2xl font-bold text-green-600">Order Confirmed!</h2>
      <p className="text-gray-600 dark:text-gray-100">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <button
         onClick={()=>navigate('/')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-green-400"
        >
          Back To Home
        </button>
    </div>
    
  );
};

export default SuccessScreen;