import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const foodContext = createContext();

const FoodContextProvider = ({ children }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = "$";
  const delivery_fee = 2;
  const navigate = useNavigate();

  const [foodItems, setFoodItems] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchFoods = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/food/getall');
      if (response.data.success) {
        setFoodItems(response.data.foodList);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fetchMenus = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/menu/getAll');
      if (response.data.success) {
        setMenuList(response.data.menuList);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchFoods();
    fetchMenus();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(menuList.map((item) => item.name || item.menu_name).filter(Boolean))];
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