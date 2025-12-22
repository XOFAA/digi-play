import React, { createContext, useContext, useMemo, useState } from "react";

const NavbarColorContext = createContext(null);

export function NavbarColorProvider({ children }) {
  const [navbarColor, setNavbarColor] = useState("rgba(0,0,0,0)"); // começa transparente

  const value = useMemo(
    () => ({ navbarColor, setNavbarColor }),
    [navbarColor]
  );

  return (
    <NavbarColorContext.Provider value={value}>
      {children}
    </NavbarColorContext.Provider>
  );
}

export function useNavbarColor() {
  const ctx = useContext(NavbarColorContext);
  if (!ctx) throw new Error("useNavbarColor must be used within NavbarColorProvider");
  return ctx;
}
