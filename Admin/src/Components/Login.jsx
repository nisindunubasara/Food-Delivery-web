
import React from "react";
import { BACKEND_URL } from "../App";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const Login = ({ setToken }) => {

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const onSubmitHandler = async (e) => {
      try {
         e.preventDefault();
         const res = await axios.post(BACKEND_URL + '/api/user/admin', { email, password })
         if(res.data.success){
            setToken(res.data.token)
         }else{
            toast.error(res.data.message)
         }

      } catch (error) {
         console.log(error)
         toast.error(error.message)
      }

   }

   return (
      <div className='min-h-screen flex items-center justify-center w-full'>
         <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
         <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
         <form onSubmit={onSubmitHandler}>

            <div className='mb-3 min-w-72'>
               <p>Email Address</p>
               <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder="your@email.com" required />
            </div>

            <div className='mb-3 min-w-72'>
               <p>Password</p>
               <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder="Enter your password" required />
            </div>

            <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800' type="submit"> Login </button>
            
         </form>
         </div>
      </div>
   );
};

export default Login;
