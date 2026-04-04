import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { foodContext } from '../Context/foodContext'
import { Show, SignInButton, UserButton, useUser } from "@clerk/react";

const Navbar = () => {
  const { cartItems, orderItems } = useContext(foodContext)
  const { isSignedIn } = useUser()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const searchRef = useRef(null)
  const searchInputRef = useRef(null)

  const handleSearchKeyDown = (event) => {
    if (event.key !== 'Enter') return

    const trimmedSearch = searchText.trim()
    const query = new URLSearchParams()

    if (trimmedSearch) {
      query.set('search', trimmedSearch)
    }

    navigate(`/menu${query.toString() ? `?${query.toString()}` : ''}`, {
      state: { searchText: trimmedSearch },
    })
    setSearchOpen(false)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus()
    }
  }, [searchOpen])

  return (
    <div className='flex items-center justify-between py-5 font-medium'>

      <Link to='/'>
        <img src={assets.logo} alt="" className='w-36' />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink className='flex flex-col items-center gap-1' to='/'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink className='flex flex-col items-center gap-1' to='/menu'>
          <p>Menu</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink className='flex flex-col items-center gap-1' to='/mobile'>
          <p>Mobile Menu</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink className='flex flex-col items-center gap-1' to='/contact'>
          <p>Contact Us</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        {orderItems.length > 0 && (
          <NavLink className='flex flex-col items-center gap-1' to='/order'>
            <p>My Orders</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        )}
      </ul>

      <div className='flex items-center gap-2 sm:gap-6'>
        <div ref={searchRef} className='relative flex h-5 w-5 items-center justify-center overflow-visible'>
          <button
            type='button'
            onClick={() => setSearchOpen((open) => !open)}
            className='flex items-center justify-center'
            aria-label='Toggle search'
            aria-expanded={searchOpen}
          >
            {!searchOpen && <img src={assets.search_icon} className='w-5 cursor-pointer' alt='' />}
          </button>

          {searchOpen && (
            <input
              ref={searchInputRef}
              type='text'
              placeholder='Search'
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              className='absolute right-0 top-1/2 h-9 w-56 -translate-y-1/2 rounded-full border border-gray-200 bg-white px-4 text-sm text-gray-700 shadow-sm outline-none placeholder:text-gray-400 focus:border-[#FF5A1F]'
            />
          )}
        </div>

        {isSignedIn && (
          <Link to='/cart' className='relative'>
            <img src={assets.basket_icon} className='w-5 min-w-5 hidden sm:block' alt="" />
            {cartItems.length > 0 && (
              <span className='absolute -top-2 -right-2 bg-[#FF5A1F] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                {cartItems.length}
              </span>
            )}
          </Link>
        )}

        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className='border border-[#FF5A1F] text-black px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer hidden sm:block'>
              Sign In
            </button>
          </SignInButton>
        </Show>

        <Show when="signed-in">
          <div className='hidden sm:block'>
            <UserButton afterSignOutUrl='/' />
          </div>
        </Show>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt=""
        />
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
            className='py-2 pl-6'
            to='/'
          >
            Home
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6'
            to='/menu'
          >
            Menu
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6'
            to='/cart'
          >
            Cart
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6'
            to='/contact'
          >
            Contact Us
          </NavLink>

          {orderItems.length > 0 && (
            <NavLink
              onClick={() => setVisible(false)}
              className='py-2 pl-6'
              to='/order'
            >
              My Orders
            </NavLink>
          )}

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className='m-4 border border-[#FF5A1F] text-black px-5 py-2 rounded-full text-sm cursor-pointer'>
                Sign In
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <div className='m-4'>
              <UserButton afterSignOutUrl='/' />
            </div>
          </Show>
        </div>
      </div>
    </div>
  )
}

export default Navbar