import React, { createContext, useContext, useState } from "react";

const navbarContext = createContext();

export const useNavbarContext = () => {
  return useContext(navbarContext);
};

const NavbarContextProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState("0");
  const values = {
    selectedIndex,
    setSelectedIndex,
  };
  return (
    <navbarContext.Provider value={values}>{children}</navbarContext.Provider>
  );
};

export default NavbarContextProvider;
