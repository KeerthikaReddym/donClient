import React, { createContext, useState } from "react";

export const MyProductsContext = createContext(null);

export const MyProductsProvider = ({ children }) => {
  const [isMyProductsChecked, setIsMyProductsChecked] = useState(false);

  return (
    <MyProductsContext.Provider value={{ isMyProductsChecked, setIsMyProductsChecked }}>
      {children}
    </MyProductsContext.Provider>
  );
};
