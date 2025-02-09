import React, { createContext, useState, useContext } from "react";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToBasket = (data, findBasketItem) => {
    if (!findBasketItem) {
      return setItems((prevItems) => [...prevItems, data]);
    }
    const filtered = items.filter((item) => item._id !== findBasketItem._id);
    setItems(filtered);
  };

  const removeFromBasket = (itemToRemove) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item._id !== itemToRemove._id)
    );
  };

  const clearBasket = () => {
    setItems([]);
  };

  return (
    <BasketContext.Provider
      value={{ items, addToBasket, removeFromBasket, clearBasket }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
