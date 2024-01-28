//preact
import { createContext } from "preact";
import { useState } from "preact/hooks";

export const globalContext = createContext({});

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  return (
    <globalContext.Provider
      value={{ isLogoutDialogOpen, setIsLogoutDialogOpen }}
    >
      {children}
    </globalContext.Provider>
  );
}
