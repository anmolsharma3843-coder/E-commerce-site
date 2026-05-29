import React, { useEffect } from 'react'
import { ImCross } from "react-icons/im";
const Model = ({title, remove, Cancel}) => {
  useEffect(() => {
    document.body.style.overflowY="hidden";
    return () => {
      document.body.style.overflowY="scroll";
    }
  }, [])
  
  return (
    <>
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-black dark:bg-gray-200 opacity-25 z-40" onClick={Cancel}></div>
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 w-[85vw] sm:w-[60vw] md:w-[40vw] lg:w-[28vw] p-4 md:p-6 rounded-md z-50 '>
                <div className='flex justify-end md:hover:cursor-pointer dark:text-gray-100' onClick={Cancel}><ImCross  size={18}/></div>
                <div className="flex flex-col gap-3 md:gap-4 mt-4 md:mt-5">
                <span className="text-lg md:text-xl font-bold dark:text-gray-100">{title}</span>
                <p className="text-sm md:text-base text-gray-700 font-semibold dark:text-gray-100">Do you want to remove this product from cart?</p>
                </div>
                <div className="flex justify-end gap-3 md:gap-5 md:hover:cursor-pointer text-xs md:text-base mt-4">
                  <button onClick={Cancel} className="font-semibold text-gray-50 bg-gray-600 p-2 rounded md:hover:cursor-pointer md:hover:bg-gray-700">CANCEL</button>
                  <button onClick={remove} className="font-semibold text-gray-100  bg-red-600 p-2 rounded md:hover:cursor-pointer md:hover:bg-red-400">REMOVE</button>
                </div>
              </div>
              </>
  )
}

export default Model
