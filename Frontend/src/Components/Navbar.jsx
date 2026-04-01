import React from 'react'
import { Link } from 'react-router-dom'
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {

  const [visible, setVisible] = useState(false)

  return (
    <div className='flex items-center justify-between py-5 font-medium'>

      <Link to='/'>
        <img src={assets.logo} alt="" className='w-36'/>
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

        <NavLink className='flex flex-col items-center gap-1' to='/'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1' to='/menu'>
          <p>Menu</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1' to='/mobile'>
          <p>Mobile Menu</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink className='flex flex-col items-center gap-1' to='/contact'>
          <p>Contact Us</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>

      <div className='flex items-center gap-2 sm:gap-6'>

        <img src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

        <Link to='/cart' className='relative'>
           <img src={assets.basket_icon} className='w-5 min-w-5 hidden sm:block' alt="" />
         </Link>

         <button className='border border-[#FF5A1F] text-black px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer hidden sm:block'>sign in</button>

         <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />

      </div>

        {/* mobile sidebar menu */}
      <div
        className={`fixed inset-0 z-50 overflow-hidden bg-white transition-all sm:hidden ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className='flex flex-col text-gray-600'>
          <div
            onClick={() => setVisible(false)}
            className='flex items-center gap-4 p-3 cursor-pointer'
          >
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
            <p>Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6 '
            to='/'
          >
            Home
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6 '
            to='/menu'
          >
            Menu
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6 '
            to='/cart'
          >
            Cart
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6 '
            to='/contact'
          >
            Contact Us
          </NavLink>

          <button className='m-4 border border-[#FF5A1F] text-black px-5 py-2 rounded-full text-sm cursor-pointer'>
            sign in
          </button>
        </div>

      </div>

    </div>
  )
}

export default Navbar