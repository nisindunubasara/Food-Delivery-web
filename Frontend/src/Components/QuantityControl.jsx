import React from "react";
import { assets } from "../assets/assets";

const QuantityControl = ({ quantity, onIncrement, onDecrement, className = "" }) => {
  const baseClassName = "flex items-center gap-2 rounded-full bg-white/95 px-2 py-1 shadow-sm";
  const defaultPositionClassName = "absolute top-38 right-3";

  return (
    <div className={`${baseClassName} ${className || defaultPositionClassName}`}>
      <button type="button" onClick={onDecrement} aria-label="Decrease quantity">
        <img
          src={assets.remove_icon_red}
          alt="Decrease"
          className="w-7 transition-opacity duration-200 hover:opacity-85"
        />
      </button>

      <span className="min-w-4 text-center text-sm font-semibold text-gray-800">
        {quantity}
      </span>

      <button type="button" onClick={onIncrement} aria-label="Increase quantity">
        <img
          src={assets.add_icon_green}
          alt="Increase"
          className="w-7 transition-opacity duration-200 hover:opacity-85"
        />
      </button>
    </div>
  );
};

export default QuantityControl;