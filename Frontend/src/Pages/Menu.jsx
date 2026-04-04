import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { foodContext } from "../Context/foodContext";
import { FoodItem } from "../Components/FoodItem";

const FilterButton = ({ label, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`whitespace-nowrap rounded-full border bg-white px-4 py-2 text-sm transition-colors cursor-pointer ${
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
  const location = useLocation();
  const [searchText, setSearchText] = useState("");

  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredFoodItems,
  } = useContext(foodContext);

  useEffect(() => {
    const categoryFromNavigation = location.state?.selectedCategory;
    const stateSearchText = location.state?.searchText;
    const querySearchText = new URLSearchParams(location.search).get("search") || "";

    if (
      categoryFromNavigation &&
      categories.includes(categoryFromNavigation)
    ) {
      setSelectedCategory(categoryFromNavigation);
    }

    if (typeof stateSearchText === "string") {
      setSearchText(stateSearchText);
      return;
    }

    setSearchText(querySearchText);
  }, [location.state, categories, setSelectedCategory]);

  const visibleFoodItems = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    if (!normalizedSearch) return filteredFoodItems;

    return filteredFoodItems.filter((item) =>
      item.name.toLowerCase().includes(normalizedSearch)
    );
  }, [filteredFoodItems, searchText]);

  return (
    <div>
      <div className="flex justify-start overflow-x-auto pb-2 px-1 sm:justify-center sm:px-0">
        <div className="flex min-w-max items-center gap-3 pr-1 sm:gap-4 sm:pr-0">
          {categories.map((category) => (
            <FilterButton
              key={category}
              label={category}
              selected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 gap-y-5 sm:grid-cols-2 md:grid-cols-3 md:gap-5 md:gap-y-6 lg:grid-cols-4">
        {visibleFoodItems.map((item) => (
          <FoodItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;