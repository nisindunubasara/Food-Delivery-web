
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { BACKEND_URL, CURRENCY } from '../App'

const List = ({ token }) => {

  const [foodList, setFoodList] = useState([])
  const [menuList, setMenuList] = useState([])

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(BACKEND_URL + '/api/food/getAll')

      if (response.data.success) {
        setFoodList(response.data.foodList)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const fetchMenuList = async () => {
    try {
      const response = await axios.get(BACKEND_URL + '/api/menu/getAll')

      if (response.data.success) {
        setMenuList(response.data.menuList)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeFood = async (id) => {
    try {
      const response = await axios.post(BACKEND_URL + '/api/food/remove/' + id, {}, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchFoodList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeMenu = async (id) => {
    try {
      const response = await axios.post(BACKEND_URL + '/api/menu/remove/' + id, {}, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchMenuList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchFoodList()
    fetchMenuList()
  }, [])

  return (
    <div className='w-full grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-6'>
      <section className='bg-white border border-gray-200 rounded-xl p-4 shadow-sm'>
        <p className='mb-3 text-base font-semibold text-gray-800'>Food List</p>

        <div className='flex flex-col gap-2'>
          <div className='hidden md:grid grid-cols-[80px_1.8fr_1.2fr_1fr_52px] items-center py-2 px-3 border rounded-md bg-gray-100 text-sm'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className='text-center'>Action</b>
          </div>

          {foodList.length > 0 ? (
            foodList.map((item) => (
              <div className='grid grid-cols-[70px_1fr_40px] md:grid-cols-[80px_1.8fr_1.2fr_1fr_52px] items-center gap-2 py-2 px-3 border rounded-md text-sm' key={item._id}>
                <img className='w-14 h-14 object-cover rounded-md' src={item.image?.[0]} alt={item.name} />
                <p className='truncate'>{item.name}</p>
                <p className='hidden md:block truncate'>{item.category}</p>
                <p className='hidden md:block'>{CURRENCY}{item.price}</p>
                <button type='button' className='justify-self-end md:justify-self-center cursor-pointer' onClick={() => removeFood(item._id)}>
                  <img className='w-4 h-4' src={assets.cross_icon} alt='remove food item' />
                </button>
              </div>
            ))
          ) : (
            <p className='text-sm text-gray-500 border rounded-md py-3 px-3'>No food items found.</p>
          )}
        </div>
      </section>

      <section className='bg-white border border-gray-200 rounded-xl p-4 shadow-sm'>
        <p className='mb-3 text-base font-semibold text-gray-800'>Menu List</p>

        <div className='flex flex-col gap-2'>
          <div className='hidden md:grid grid-cols-[80px_1fr_52px] items-center py-2 px-3 border rounded-md bg-gray-100 text-sm'>
            <b>Image</b>
            <b>Name</b>
            <b className='text-center'>Action</b>
          </div>

          {menuList.length > 0 ? (
            menuList.map((item) => (
              <div className='grid grid-cols-[70px_1fr_40px] md:grid-cols-[80px_1fr_52px] items-center gap-2 py-2 px-3 border rounded-md text-sm' key={item._id}>
                <img className='w-14 h-14 object-cover rounded-md' src={item.image} alt={item.name} />
                <p className='truncate'>{item.name}</p>
                <button type='button' className='justify-self-end md:justify-self-center cursor-pointer' onClick={() => removeMenu(item._id)}>
                  <img className='w-4 h-4' src={assets.cross_icon} alt='remove menu item' />
                </button>
              </div>
            ))
          ) : (
            <p className='text-sm text-gray-500 border rounded-md py-3 px-3'>No menu items found.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default List
