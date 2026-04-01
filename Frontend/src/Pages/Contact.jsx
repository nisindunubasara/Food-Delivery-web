import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text="CONTACT US"  />
        </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
          <img className='w-full md:max-w-[480px]' src={assets.food_2} alt="" />
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'>Our Company</p>
            <p className='text-gray-500'>54709 Willms Station <br/> Suite 350, Washington, USA</p>
            <p className='text-gray-500'>Phone: (123) 456-7890</p>
            <p className='text-gray-500'>Email: info@ourstore.com</p>
            <p className='text-gray-500'>Hours: Mon-Sat 9AM-8PM, Sun 10AM-6PM</p>
            <p className='font-semibold text-xl text-gray-600'>Careers at Tomato</p>
            <p className='text-gray-500'>Learn about our jobs and opportunities!</p>
            <button className='bg-black text-white py-2 px-8 hover:bg-gray-800 transition duration-300 cursor-pointer'>View Open Positions</button>
          </div>
        </div>
    </div>
  )
}

export default Contact
