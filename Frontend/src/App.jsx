import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Menu from './Pages/Menu'
import MobileApp from './Pages/MobileApp'
import Contact from './Pages/Contact'
import Login from './Pages/Login'
import Cart from './Pages/Cart'
import Payment from './Pages/Payment'
import Order from './Pages/Order'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
    <div>
      <div  className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/mobile' element={<MobileApp />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/order' element={<Order />} />
      </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App