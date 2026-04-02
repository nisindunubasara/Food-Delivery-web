import React, { useContext } from 'react'
import Title from './Title'
import { foodContext } from '../Context/foodContext'

export const ExploreMenu = () => {
  const { menuList, navigate, setSelectedCategory } = useContext(foodContext)

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    navigate('/menu', { state: { selectedCategory: category } })
  }

  return (
    <div>
      <div className='text-center sm:text-left text-2xl sm:text-3xl py-6 sm:py-8'>
         <Title text='Explore our menu' />
         <p className='text-center sm:text-left text-xs sm:text-sm md:text-base text-gray-600 max-w-full sm:max-w-[65%] px-2 sm:px-0'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 gap-y-5 sm:gap-y-6'>
        {menuList.map((item, index) => (
          <button
            key={index}
            type='button'
            onClick={() => handleCategoryClick(item.menu_name)}
            className='rounded-lg p-2 sm:p-4 hover:shadow-lg transition-shadow duration-300 text-left cursor-pointer'
          >
            <img src={item.menu_image} alt="" className='w-full h-auto rounded-lg' />
            <h3 className='text-xs sm:text-lg text-center font-semibold mt-2'>{item.menu_name}</h3>
          </button>
        ))}
         <hr className='border-t border-gray-300 col-span-full' />
      </div>

    </div>
  )
}
