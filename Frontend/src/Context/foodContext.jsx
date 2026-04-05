import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "@clerk/react";

export const foodContext = createContext();

const FoodContextProvider = ({ children }) => {
  const { isSignedIn, user } = useUser();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = "$";
  const delivery_fee = 2;
  const navigate = useNavigate();
  const userId = user?.id || "";

  const [foodItems, setFoodItems] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const normalizeImage = (imageValue) => {
    if (Array.isArray(imageValue)) return imageValue[0] || "";
    return imageValue || "";
  };

  const mapOrderForUi = (order) => {
    const deliveryInfo = order.customerDeliveryInfo || {};

    return {
      ...order,
      customer: {
        firstName: deliveryInfo.firstName || "",
        lastName: deliveryInfo.lastName || "",
        email: deliveryInfo.email || "",
        phone: deliveryInfo.phone || "",
        street: deliveryInfo.street || "",
        city: deliveryInfo.city || "",
        state: deliveryInfo.state || "",
        zipcode: deliveryInfo.postalCode || "",
        country: deliveryInfo.country || "",
      },
      orderedItems: (order.orderedItems || []).map((item) => ({
        ...item,
        image: normalizeImage(item.image),
      })),
    };
  };

  const fetchCartItems = async () => {
    if (!isSignedIn || !userId) {
      setCartItems([]);
      return;
    }

    try {
      const response = await axios.get(backendUrl + "/api/cart/list", { params: { userId } });
      if (response.data.success) {
        setCartItems(response.data.items || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const addCartItem = async (foodItem, quantity = 1) => {
    if (!isSignedIn || !userId) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    try {
      const payload = {
        userId,
        foodId: foodItem._id,
        name: foodItem.name,
        price: Number(foodItem.price),
        image: normalizeImage(foodItem.image),
        quantity,
      };

      const response = await axios.post(backendUrl + "/api/cart/add", payload);

      if (response.data.success) {
        if (response.data.cart?.items) {
          setCartItems(response.data.cart.items);
        } else {
          await fetchCartItems();
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateCartItem = async (foodId, quantity) => {
    if (!isSignedIn || !userId) {
      toast.error("Please sign in to update cart");
      return;
    }

    try {
      const response = await axios.post(backendUrl + "/api/cart/update/" + foodId, { userId, quantity });

      if (response.data.success) {
        if (response.data.cart?.items) {
          setCartItems(response.data.cart.items);
        } else {
          await fetchCartItems();
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeCartItem = async (foodId) => {
    if (!isSignedIn || !userId) {
      toast.error("Please sign in to update cart");
      return;
    }

    try {
      const response = await axios.post(backendUrl + "/api/cart/remove/" + foodId, { userId });

      if (response.data.success) {
        if (response.data.cart?.items) {
          setCartItems(response.data.cart.items);
        } else {
          await fetchCartItems();
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const fetchOrderItems = async () => {
    if (!isSignedIn || !userId) {
      setOrderItems([]);
      return [];
    }

    try {
      const response = await axios.get(backendUrl + "/api/order/list", {
        params: { userId },
      });

      if (response.data.success) {
        const orders = response.data.orders || response.data.orderList || [];
        const mappedOrders = orders.map(mapOrderForUi);
        setOrderItems(mappedOrders);
        return mappedOrders;
      } else {
        toast.error(response.data.message);
        return [];
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return [];
    }
  };

  const createOrder = async ({ customerDeliveryInfo, orderedItems, paymentMethod, paymentStatus, totalAmount }) => {
    if (!isSignedIn || !userId) {
      toast.error("Please sign in to place order");
      return { success: false };
    }

    try {
      const payload = {
        userId,
        customerDeliveryInfo,
        orderedItems: (orderedItems || []).map((item) => ({
          foodId: item.foodId || item._id,
          name: item.name,
          price: Number(item.price),
          image: normalizeImage(item.image),
          quantity: Number(item.quantity),
        })),
        totalAmount: Number(totalAmount),
        paymentMethod,
        paymentStatus,
      };

      const response = await axios.post(backendUrl + "/api/order/add", payload);

      if (!response.data.success) {
        toast.error(response.data.message);
        return { success: false };
      }

      await fetchOrderItems();
      await fetchCartItems();

      return { success: true, order: response.data.order };
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return { success: false };
    }
  };

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

  useEffect(() => {
    fetchCartItems();
    fetchOrderItems();
  }, [isSignedIn, userId]);

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
    addCartItem,
    updateCartItem,
    removeCartItem,
    fetchCartItems,
    currency,
    delivery_fee,
    navigate,
    orderItems,
    setOrderItems,
    createOrder,
    fetchOrderItems,
    userId,
    isSignedIn,
  };

  return (
    <foodContext.Provider value={value}>
      {children}
    </foodContext.Provider>
  );
};

export default FoodContextProvider;