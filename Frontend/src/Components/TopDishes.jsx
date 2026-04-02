import React from "react";
import Title from "./Title";
import { food_list } from "../assets/assets";
import { assets } from "../assets/assets";
import { FoodItem } from "./FoodItem";

export const TopDishes = () => {
  return (
    <div>
      <div className="mt-9">
        <Title text={"Top dishes near you"} />
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 gap-y-5 md:gap-y-6">
        {food_list.slice(0, 8).map((item, index) => (
          <FoodItem
            key={index}
            item={item}
            image={item.image}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
      <hr className='mt-9 border-t border-gray-300 col-span-full'/>
      <div className="mt-14 md:mt-25 text-center max-w-[550px] mx-auto px-4 md:px-0">
        <p className="text-gray-700 text-2xl sm:text-3xl md:text-4xl font-bold tracking-normal leading-tight">
          For Better Experience Download Tomato App
        </p>
        <div className="mt-5 md:mt-6 flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
         <img
           src={assets.app_store}
           alt="Download on the App Store"
           className="w-28 sm:w-32 md:w-36 h-auto"
         />
         <img
           src={assets.play_store}
           alt="Get it on Google Play"
           className="w-28 sm:w-32 md:w-36 h-auto"
         />
        </div>
      </div>
    </div>
  );
};
