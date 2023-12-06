import React, { useState, createContext } from 'react';

export const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const updateProducts = (newProducts) => {
    setProducts(newProducts);
  };

  return (
    <ProductsContext.Provider value={{ products, updateProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
