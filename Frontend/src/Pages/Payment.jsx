import React from 'react'
import Title from '../Components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../Components/CartTotal';
import { useState } from 'react';
import { foodContext } from '../Context/foodContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const Payment = () => {

  const [method, setMethod] = useState("cod");
  const { cartItems, removeCartItem, createOrder, delivery_fee, navigate } = useContext(foodContext);

  const paymentMethods = [
    {
      key: "stripe",
      label: "Stripe",
      content: <img className="h-5 w-auto" src={assets.stripe_logo} alt="Stripe" />,
    },
    {
      key: "cod",
      label: "Cash on Delivery",
      content: <p className="text-sm font-medium text-gray-600">Cash on Delivery</p>,
    },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalAmount = () => {
    const subtotal = getSubtotal();
    return subtotal === 0 ? 0 : subtotal + delivery_fee;
  };

  const getPaymentStatusByMethod = (paymentMethod) => {
    if (paymentMethod === "stripe") return true;
    if (paymentMethod === "cod") return false;
    return false;
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const paymentStatus = getPaymentStatusByMethod(method) ? "Paid" : "Pending";

    const result = await createOrder({
      customerDeliveryInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zipcode,
        country: formData.country,
      },
      orderedItems: cartItems,
      paymentMethod: method,
      paymentStatus,
      totalAmount: getTotalAmount(),
    });

    if (!result.success) return;

    await Promise.all(
      cartItems.map((item) => removeCartItem(item.foodId || item._id))
    );

    toast.success("Order placed successfully");
    navigate("/order");
  };

  return (
    <form
      onSubmit={handlePlaceOrder}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Shipping Details Form (left side) */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text={"DELIVERY INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street Address"
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zip Code"
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="tel"
          placeholder="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
        />
      </div>

      {/* Order Summary (right side) */}
      <div className="mt-2">
        <div className="mt-2 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text={"PAYMENT METHOD"} />
          {/* Payment method options*/}
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {paymentMethods.map((paymentOption) => {
              const isSelected = method === paymentOption.key;

              return (
                <button
                  key={paymentOption.key}
                  type="button"
                  onClick={() => setMethod(paymentOption.key)}
                  className={`flex h-14 w-full items-center justify-center gap-3 rounded-xl border px-4 py-3 text-center transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#FF5A1F] bg-orange-50 shadow-sm"
                      : "border-gray-300 bg-white hover:border-[#FF5A1F]/60 hover:bg-orange-50/40"
                  }`}
                >
                  <span
                    className={`h-3.5 w-3.5 rounded-full border ${
                      isSelected ? "border-[#FF5A1F] bg-[#FF5A1F]" : "border-gray-400"
                    }`}
                  />
                  {paymentOption.content}
                </button>
              );
            })}
          </div>
          <div className="w-full text-end mt-8">
            <button
            type='submit'
            className='mt-3 w-full rounded-lg bg-[#FF5A1F] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-95 sm:text-base cursor-pointer'
         >

            PLACE ORDER
         </button>        
           </div>
        </div>
      </div>
    </form>
  );

}

export default Payment
