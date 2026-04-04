import React from 'react'
import Navbar from './Components/Navbar'
import Slidebar from './Components/Slidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './Pages/add'
import List from './Pages/list'
import Orders from './Pages/orders'
import { useState, useEffect } from 'react'
import Login from './Components/Login'
import { ToastContainer } from 'react-toastify'

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const CURRENCY = import.meta.env.VITE_CURRENCY 

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])


  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === '' ? <Login setToken={setToken}/> : 
      <div>
      <Navbar setToken={setToken}/>
      <hr />
      <div className='flex w-full'>
        <Slidebar />
          <div className='w-[70%] mx-auto ml-[max(5vw, 25px) ] my-8 [text-gray-600 text-base'>
          <Routes>
            <Route path='/add' element={<Add token={token} />} />
            <Route path='/list' element={<List token={token} />} />
            <Route path='/orders' element={<Orders token={token} />} />
          </Routes>
          </div>
      </div>
      </div>
      }
    </div>
  )
}

export default App