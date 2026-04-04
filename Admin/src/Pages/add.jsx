
import React from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from "../App";
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1, setImage1] = React.useState(false)
  const [menuImage, setMenuImage] = React.useState(false)
  const [menuName, setMenuName] = useState('')
  const [menuList, setMenuList] = useState([])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')

  const fetchMenuList = async () => {
    try {
      const response = await axios.get(BACKEND_URL + "/api/menu/getAll")

      if (response.data.success) {
        setMenuList(response.data.menuList)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occurred while fetching menus.")
    }
  }

  useEffect(() => {
    fetchMenuList()
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      
      const formData = new FormData()
      formData.append("name", name)
      formData.append("price", price)
      formData.append("description", description)
      formData.append("category", category)

      image1 && formData.append("image", image1)

      const response = await axios.post(BACKEND_URL + "/api/food/add", formData, {headers:{token}})

      console.log(response)

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setPrice('')
        setCategory('')
        setImage1(false)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("An error occurred while adding the product.")
    }
  }

  const onMenuSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append("menuName", menuName)
      formData.append("name", menuName)

      menuImage && formData.append("menuImage", menuImage)

      const response = await axios.post(BACKEND_URL + "/api/menu/add", formData, {headers:{token}})

      console.log(response)

      if (response.data.success) {
        toast.success(response.data.message)
        setMenuName('')
        setMenuImage(false)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("An error occurred while adding the menu.")
    }
  }

  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch'>
      <section className='bg-white border border-gray-200 rounded-xl p-5 shadow-sm h-full min-h-[560px] flex flex-col'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>Add Food Items</h2>

        <form className='flex flex-col w-full flex-1 items-start' onSubmit={onSubmitHandler}>
          <div className='flex flex-col w-full items-start gap-3'>
            <div>
              <p className='mb-2'>Upload Image</p>

              <div className='flex gap-2'>
                <label htmlFor="image1" className='inline-block cursor-pointer'>
                  <img className='w-28 h-28 object-cover rounded-md border border-dashed border-gray-300 p-1 bg-gray-50' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="food upload" />
                  <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden/>
                </label>
              </div>
            </div>

            <div className='w-full'>
              <p className='mb-2'>Food name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/20' type="text" placeholder='Type here' />
            </div>

            <div className='w-full'>
              <p className='mb-2'>Description</p>
              <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/20' placeholder='Write a short description' />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

              <div>
                <p className='mb-2'>Food category</p>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/20'>
                  <option value="">Select category</option>
                  {menuList.length > 0 ? (
                    menuList.map((menu) => (
                      <option key={menu._id} value={menu.name}>{menu.name}</option>
                    ))
                  ) : (
                    <option value="" disabled>No menus available</option>
                  )}
                </select>
              </div>

              <div>
                <p className='mb-2'>Food Price</p>
                <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/20' type="Number" placeholder='25' />
              </div>

            </div>
          </div>

          <button type="submit" className='w-35 py-3 mt-3 bg-black text-white cursor-pointer rounded-md'>Submit</button>
        </form>
      </section>

      <section className='bg-white border border-gray-200 rounded-xl p-5 shadow-sm h-full min-h-[560px] flex flex-col'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>Add New Menu</h2>

        <form className='flex flex-col w-full flex-1 items-start' onSubmit={onMenuSubmitHandler}>
          <div className='w-full flex flex-col gap-4'>
            <div>
              <p className='mb-2'>Upload Menu Image</p>

              <label htmlFor="menuImage" className='inline-block cursor-pointer'>
                <img className='w-28 h-28 object-cover rounded-md border border-dashed border-gray-300 p-1 bg-gray-50' src={!menuImage ? assets.upload_area : URL.createObjectURL(menuImage)} alt="menu upload" />
                <input onChange={(e) => setMenuImage(e.target.files[0])} type="file" id="menuImage" hidden/>
              </label>
            </div>

            <div className='w-full'>
              <p className='mb-2'>Menu Name</p>
              <input onChange={(e) => setMenuName(e.target.value)} value={menuName} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/20' type="text" placeholder='Enter menu name' />
            </div>
          </div>

          <button type="submit" className='w-35 py-3 mt-4 bg-black text-white cursor-pointer rounded-md'>Submit</button>
        </form>
      </section>
    </div>
  )
}

export default Add
