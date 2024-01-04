//preact
import { createContext } from "preact";
import { useEffect, useReducer, useState } from "preact/hooks";

export const globalContext = createContext({});

export default function GlobalContextProvider({ children, ...props }) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  return (
    <globalContext.Provider
      value={{ isLogoutDialogOpen, setIsLogoutDialogOpen }}
    >
      {children}
    </globalContext.Provider>
  );
}
