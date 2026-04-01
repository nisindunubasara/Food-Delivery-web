import React from 'react'
import {assets} from '../assets/assets'

export const Hero = () => {
  return (
    <div className='relative'>
      <img src={assets.header_img}alt="" className='w-full rounded-2xl mt-3'/>

      <div className='absolute inset-0 flex items-center sm:mt-15'>
        <div className='pl-4 sm:pl-10 md:pl-16 max-w-[49%] sm:max-w-[55%]'>
          <h1 className='text-white text-md sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight'>
            Order your favourite food here
          </h1>

          <p className='hidden sm:block text-white/90 mt-1 text-sm md:text-base leading-5'>
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>

          <button className='mt-6 bg-white text-gray-700 px-6 py-3 rounded-full text-sm md:text-base hidden sm:inline-block'>
            View Menu
          </button>
        </div>
      </div>

    </div>
  )
}
