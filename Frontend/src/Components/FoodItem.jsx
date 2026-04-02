import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { foodContext } from "../Context/foodContext";
import QuantityControl from "./QuantityControl";

export const FoodItem = ({ item }) => {
  const { setCartItems } = useContext(foodContext);
  const [quantity, setQuantity] = useState(0);

  const handleFirstAdd = () => {
    setQuantity(1);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const handleCartClick = () => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      const updatedItem = { ...item, quantity };

      if (existingItemIndex === -1) {
        return [...prevCartItems, updatedItem]; 
      }

      return prevCartItems.map((cartItem, index) =>
        index === existingItemIndex ? updatedItem : cartItem
      );
    });

    setQuantity(0);
  };

  return (
    <div className="cursor-pointer rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="relative">
        <img src={item.image} alt={item.name} className="w-full rounded-t-lg" />

        {quantity === 0 ? (
          <button
            type="button"
            onClick={handleFirstAdd}
            aria-label="Add item"
            className="absolute top-38 right-3"
          >
            <img
              src={assets.add_icon_white}
              alt="Add item"
              className="w-8 cursor-pointer opacity-80 transition-opacity duration-300 hover:opacity-100"
            />
          </button>
        ) : (
          <QuantityControl
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold text-left sm:text-lg">
            {item.name}
          </h3>
          <img className="w-2/7" src={assets.rating_starts} alt="Rating" />
        </div>

        <p className="mt-2 text-xs text-gray-600">{item.description}</p>

        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-lg font-bold text-green-500">
            ${item.price.toFixed(2)}
          </p>

          {quantity > 0 && (
            <button
              type="button"
              onClick={handleCartClick}
              aria-label="Cart"
              className="shrink-0 cursor-pointer rounded-full border border-green-500/20 bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-500 transition-colors sm:px-4 sm:py-2"
            >
              Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};