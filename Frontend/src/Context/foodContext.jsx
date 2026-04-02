import React, { createContext, useEffect, useMemo, useState } from "react";
import { food_list, menu_list } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const foodContext = createContext();

const FoodContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 2;
  const navigate = useNavigate();

  const [foodItems, setFoodItems] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setFoodItems(food_list);
    setMenuList(menu_list);
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(menuList.map((item) => item.menu_name))];
    return ["All", ...uniqueCategories];
  }, [menuList]);

  const filteredFoodItems = useMemo(() => {
    if (selectedCategory === "All") return foodItems;
    return foodItems.filter((item) => item.category === selectedCategory);
  }, [foodItems, selectedCategory]);

  const value = {
    foodItems,
    menuList,
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredFoodItems,
    cartItems,
    setCartItems,
    currency,
    delivery_fee,
    navigate,
    orderItems,
    setOrderItems,
  };

  return (
    <foodContext.Provider value={value}>
      {children}
    </foodContext.Provider>
  );
};

export default FoodContextProvider;