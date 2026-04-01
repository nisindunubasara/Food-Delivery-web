import React from "react";
import { assets } from "../assets/assets";

export const FoodItem = ({ image, name, description, price }) => {
  return (
    <div
      className=" hover:shadow-lg shadow-md rounded-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative">
        <img src={image} alt="" className="w-full rounded-t-lg" />
        <img
          src={assets.add_icon_white}
          alt="Add item"
          className="absolute top-38 right-3 w-8 transition-opacity duration-300 opacity-80 hover:opacity-100"
        />
      </div>
      <div className="p-3">
        <div className="flex flex-row items-center justify-between ">
          <h3 className="text-xs sm:text-lg text-left font-semibold ">
            {name}
          </h3>
          <img className="w-2/7" src={assets.rating_starts} alt="" />
        </div>
        <p className="text-xs text-gray-600 mt-2 ">{description}</p>
        <p className="text-lg text-green-500 font-bold mt-2">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
