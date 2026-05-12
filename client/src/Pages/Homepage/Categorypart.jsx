import React from 'react'
import { FaAngleDown } from "react-icons/fa";
const Categorypart = () => {
  return (
    <div className=' w-full md:w-80 h-auto  md:top-32 md:left-0 overflow-y-auto'>
      <div className="hidden md:flex rounded-sm border border-gray-300 w-full p-2 items-center text-sm md:text-base">
        <p>Sort By:</p>
        <b>Relevenace</b>
        <FaAngleDown size={16} className='ml-auto md:ml-40'/>
      </div>
      <div className="hidden md:flex flex-col rounded-sm border border-gray-300 w-full p-2 mt-2 md:mt-4 ">
        <span className="text-sm md:text-base">FILTERS</span>
         <p className="text-sm md:text-base">1000+ Products</p>
      </div>
      <div className="flex flex-row md:flex-col rounded-sm border border-gray-300 w-full  sm:p-2 md:mt-4 overflow-y-auto max-h-96 md:max-h-none overflow-x-scroll bg-white md:bg-none">
        <div className="flex justify-between items-center px-2 py-2 md:p-3  md:pb-2 max-sm:gap-2 max-sm:border-r border-gray-300">
        <h5 className="text-sm md:text-base">Category</h5>
        <FaAngleDown size={14}/>
        </div>
        <input type="text"  placeholder='Search' className='rounded-sm border border-gray-300 w-full p-1 md:p-2 h-8 md:h-10 mt-1 md:mt-2 text-sm max-md:hidden' />
        <div className="m-1 md:m-2 text-gray-800 text-sm md:text-base md:block hidden">
          <div className="flex justify-start items-center gap-2 w-full p-1 md:p-2"><input type="checkbox"/>Women Tops And Tunics<br /></div>
          <div className="flex justify-start items-center gap-2 w-full p-1 md:p-2"><input type="checkbox"/>Women T-shirts<br /></div>
          <div className="flex justify-start items-center gap-2 w-full p-1 md:p-2"><input type="checkbox"/>Analog Watches<br /></div>
          <div className="flex justify-start items-center gap-2 w-full p-1 md:p-2"><input type="checkbox"/>Bangles & Bracelets<br /></div>
          <div className="flex justify-start items-center gap-2 w-full p-1 md:p-2"><input type="checkbox"/>Bedsheets<br /></div>
          <div className="flex justify-start items-center gap-2 w-full p-1 md:p-2"><input type="checkbox"/>Bike Covers<br /></div>
          <div className="flex justify-start items-center gap-2 w-full p-1 md:p-2"><input type="checkbox"/>Blouses<br /></div>
          <div className="flex justify-start items-center gap-2 w-full p-1 md:p-2"><input type="checkbox"/>Bluetooth Headphones<br /></div>
          <div className="flex justify-start items-center gap-2 w-full p-1 md:p-2"><input type="checkbox"/>Boxes, Baskets & Bins<br /></div>
          <div className="flex justify-start items-center gap-2 w-full p-1 md:p-2"><input type="checkbox"/>Condoms<br /></div>
          <div className="flex justify-start items-center gap-2 w-full p-1 md:p-2"><input type="checkbox"/>Dresses<br /></div>
        </div>
        <div className="h-0.5 bg-gray-300 rounded-sm w-full mt-2 md:mt-4 sm:block hidden"></div>
       <div className="flex justify-between items-center px-2 py-2 md:p-3  md:pb-2 max-sm:gap-2 max-sm:border-r border-gray-300">
        <h5 className="text-sm md:text-base">Gender</h5>
        <FaAngleDown size={14}/>
        </div>
        <div className="hidden md:flex justify-start items-center flex-wrap gap-2 md:gap-5 m-1 md:m-2">
          <span className="flex justify-center items-center flex-wrap border-2 border-gray-700 rounded-full px-2 md:px-3 text-sm md:text-base">Boys</span>
          <span className="flex justify-center items-center flex-wrap border-2 border-gray-700 rounded-full px-2 md:px-3 text-sm md:text-base">Girl</span>
          <span className="flex justify-center items-center flex-wrap border-2 border-gray-700 rounded-full px-2 md:px-3 text-sm md:text-base">Men</span>
          <span className="flex justify-center items-center flex-wrap border-2 border-gray-700 rounded-full px-2 md:px-3 text-sm md:text-base">Women</span>
        </div>
        <div className="h-0.5 bg-gray-300 rounded-sm w-full mt-2 md:mt-4"></div>
      
        <div className="flex justify-between items-center px-2 py-2 md:p-3  md:pb-2 max-sm:gap-2 max-sm:border-r border-gray-300">
          <h5 className="text-sm md:text-base">Color</h5>
          <FaAngleDown size={14}/>
        </div>
        <div className="h-0.5 bg-gray-300 rounded-sm w-full mt-2 md:mt-4 sm:block hidden"></div>
        <div className="flex justify-between items-center px-2 py-2 md:p-3 md:pb-2 max-sm:gap-2 max-sm:border-r border-gray-300">
          <h5 className="text-sm md:text-base">Fabric</h5>
          <FaAngleDown size={14}/>
        </div>
        <div className="h-0.5 bg-gray-300 rounded-sm w-full mt-2 md:mt-4 sm:block hidden"></div>
        <div className="flex justify-between items-center px-2 py-2 md:p-3 md:pb-2 max-sm:gap-2 max-sm:border-r border-gray-300">
          <h5 className="text-sm md:text-base whitespace-nowrap">Dail Shape</h5>
          <FaAngleDown size={14}/>
        </div>
        <div className="h-0.5 bg-gray-300 rounded-sm w-full mt-2 md:mt-4 sm:block hidden"></div>
        <div className="flex justify-between items-center px-2 py-2 md:p-3 md:pb-2 max-sm:gap-2 max-sm:border-r border-gray-300">
          <h5 className="text-sm md:text-base">Size</h5>
          <FaAngleDown size={14}/>
        </div>
        <div className="h-0.5 bg-gray-300 rounded-sm w-full mt-2 md:mt-4 sm:block hidden"></div>
        <div className="flex justify-between items-center px-2 py-2 md:p-3 md:pb-2 max-sm:gap-2 max-sm:border-r border-gray-300">
          <h5 className="text-sm md:text-base">Price</h5>
          <FaAngleDown size={14}/>
        </div>
         <div className="h-0.5 bg-gray-300 rounded-sm w-full mt-2 md:mt-4 sm:block hidden"></div>
        <div className="flex justify-between items-center px-2 py-2 md:p-3 md:pb-2 max-sm:gap-2 max-sm:border-r border-gray-300">
          <h5 className="text-sm md:text-base">Rating</h5>
          <FaAngleDown size={14}/>
        </div>
        <div className="h-0.5 bg-gray-300 rounded-sm w-full mt-2 md:mt-4 sm:block hidden"></div>
        <div className="flex justify-between items-center px-2 py-2 md:p-3 md:pb-2 max-sm:gap-2 max-sm:border-r border-gray-300">
          <h5 className="text-sm md:text-base">Occassion</h5>
          <FaAngleDown size={14}/>
        </div>
         <div className="h-0.5 bg-gray-300 rounded-sm w-full mt-2 md:mt-4 sm:block hidden"></div>
        <div className="flex justify-between items-center px-2 py-2 md:p-3 md:pb-2 max-sm:gap-2 max-sm:border-r border-gray-300">
          <h5 className="text-sm md:text-base whitespace-nowrap">Kurta Fabric</h5>
          <FaAngleDown size={14}/>
        </div>
         <div className="h-0.5 bg-gray-300 rounded-sm w-full mt-2 md:mt-4 sm:block hidden"></div>
        <div className="flex justify-between items-center px-2 py-2 md:p-3 md:pb-2 max-sm:gap-2 max-sm:border-r border-gray-300">
          <h5 className="text-sm md:text-base whitespace-nowrap">Dupatta Color</h5>
          <FaAngleDown size={14}/>
        </div>
      </div>
    </div>
  )
}
export default Categorypart
