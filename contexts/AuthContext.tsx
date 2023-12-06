// src/contexts/AuthContext.js

import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to handle user sign-in
  const signIn = (userData) => {
    setUser(userData);
  };

  // Function to handle user sign-out
  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
