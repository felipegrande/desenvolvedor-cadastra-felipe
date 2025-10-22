import React, { createContext, useContext, useState, ReactNode } from "react";

const OrderFormContext = createContext(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCartCount((prev) => prev + 1);
    setLoading(false);
  };

  return (
    <OrderFormContext.Provider value={{ cartCount, addToCart, loading }}>
      {children}
    </OrderFormContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(OrderFormContext);
  return context;
};
