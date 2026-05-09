import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header';
import cart from '../../assets/Images/cart.webp'
const Emptycart = () => {
  const navigate=useNavigate();
  const shopping=()=>{
    navigate("/")
  }
  return (
  
   <>
          <Header/>
           
    <div className="h-px bg-gray-100 w-full "></div>
    <div className="flex justify-center items-center flex-col h-screen px-4 dark:bg-gray-800">
      <img src={cart} alt="" className="w-40 md:w-64 h-32 md:h-52 object-cover" />
    <b className='text-lg md:text-2xl font-bold mt-4 dark:text-gray-50'>Your cart is empty</b>
  <p className="text-xs md:text-base text-gray-600 text-center mt-2 dark:text-white">Just relax, let us help you find some first-class products</p>
  <button onClick={shopping} className="text-white bg-purple-800 text-sm md:text-lg flex justify-center items-center rounded-lg h-10 md:h-12 w-4/5 sm:w-1/2 md:w-1/5 no-underline p-1 mt-6">Start Shopping</button>
    </div>
    </>
  )
}

export default Emptycart
