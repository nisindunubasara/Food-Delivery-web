import React, { useContext } from 'react'
import { foodContext } from '../Context/foodContext'
import Title from './Title';


const CartTotal = () => {

   const {currency, delivery_fee, cartItems, navigate} = useContext(foodContext);

   const getCartAmount = () => {
      return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
   };

   return (
      <div className='w-full'>
         <div className='text-lg sm:text-xl'>
            <Title text={'CART TOTALS'} />
         </div>

         <div className='mt-2 flex flex-col gap-2 text-sm'>
            <div className='flex justify-between'>
               <p>Subtotal</p>
               <p>{currency} {getCartAmount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
               <p>Delivery Fee</p>
               <p>{currency} {delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
               <p>Total</p>
               <p>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</p>
            </div>
         </div>
   </div>
   )
}
export default CartTotal