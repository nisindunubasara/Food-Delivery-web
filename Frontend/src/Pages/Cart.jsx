import React, { useContext } from "react";
import Title from "../Components/Title";
import { foodContext } from "../Context/foodContext";
import { assets } from "../assets/assets";
import QuantityControl from "../Components/QuantityControl";
import CartTotal from "../Components/CartTotal";

const isSameCartItem = (leftItem, rightItem) =>
  leftItem._id && rightItem._id
    ? leftItem._id === rightItem._id
    : leftItem.name === rightItem.name;

const CartItemRow = ({ item, currency, onRemove, onIncrement, onDecrement }) => {
  return (
    <div className="grid grid-cols-[72px_1fr_auto] items-center gap-3 rounded-xl border border-gray-100 p-3 sm:gap-4 sm:p-4">
      <img
        src={item.image}
        alt={item.name}
        className="h-16 w-16 rounded-lg object-cover sm:h-18 sm:w-18"
      />

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-800 sm:text-base">
          {item.name}
        </p>
        <p className="mt-1 text-sm text-gray-500">
          {currency}
          {Number(item.price).toFixed(2)}
        </p>
      </div>

      <div className="flex items-center justify-end gap-4 sm:gap-5">
        <QuantityControl
          quantity={item.quantity}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          className="relative flex-shrink-0"
        />

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${item.name}`}
          className="ml-1 flex-shrink-0 rounded-full p-1.5 transition-colors hover:bg-red-50 cursor-pointer"
        >
          <img src={assets.bin_icon} alt="Remove" className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cartItems, currency, setCartItems, navigate } = useContext(foodContext);

  const handleRemoveItem = (itemToRemove) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((cartItem) => !isSameCartItem(cartItem, itemToRemove)),
    );
  };

  const handleIncrementItem = (itemToUpdate) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        isSameCartItem(cartItem, itemToUpdate)
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      ),
    );
  };

  const handleDecrementItem = (itemToUpdate) => {
    setCartItems((prevCartItems) =>
      prevCartItems
        .map((cartItem) =>
          isSameCartItem(cartItem, itemToUpdate)
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    );
  };

  return (
    <div className="border-t pt-14">
      <div className="mb-6 text-2xl">
        <Title text="YOUR CART" />
      </div>

      {cartItems.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 px-4 py-8 text-center text-gray-600">
          Cart is empty
        </p>
      ) : (
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-6">
          <div className="space-y-3 sm:space-y-4">
            {cartItems.map((item) => (
              <CartItemRow
                key={item._id || item.name}
                item={item}
                currency={currency}
                onRemove={() => handleRemoveItem(item)}
                onIncrement={() => handleIncrementItem(item)}
                onDecrement={() => handleDecrementItem(item)}
              />
            ))}
          </div>

          <aside className="w-full max-w-sm justify-self-end rounded-xl border border-gray-100 p-3 shadow-sm sm:p-4 lg:sticky lg:top-4">
            <CartTotal />
            <button
            type='button'
            className='mt-3 w-full rounded-lg bg-[#FF5A1F] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-95 sm:text-base cursor-pointer'
            onClick={() => navigate('/payment')}
         >

            PROCEED TO CHECKOUT
         </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
