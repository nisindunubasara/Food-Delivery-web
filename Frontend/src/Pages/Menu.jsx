import React, { useState } from "react";
import { food_list } from "../assets/assets";
import { FoodItem } from "../Components/FoodItem";

const FilterButton = ({ label, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-full border bg-white px-4 py-2 text-sm whitespace-nowrap cursor-pointer transition-colors ${
        selected
          ? "border-[#FF5A1F] text-[#FF5A1F]"
          : "border-gray-300 text-gray-700 hover:border-gray-400"
      }`}
    >
      {label}
    </button>
  );
};

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    "All",
    "Salad",
    "Rolls",
    "Deserts",
    "Sandwich",
    "Cake",
    "Pure Veg",
    "Pasta",
    "Noodles",
  ];

  return (
    <div>
      <div className="overflow-x-auto pb-2 flex justify-start sm:justify-center px-1 sm:px-0">
        <div className="flex min-w-max items-center gap-3 sm:gap-4 pr-1 sm:pr-0">
          {categories.map((category) => (
            <FilterButton
              key={category}
              label={category}
              selected={selectedCategory === category}
              onClick={() =>
                setSelectedCategory((prev) =>
                  prev === category ? null : category
                )
              }
            />
          ))}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 gap-y-5 md:gap-y-6">
        {food_list.map((item, index) => (
          <FoodItem
            key={index}
            image={item.image}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
