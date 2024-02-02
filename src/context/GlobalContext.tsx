//preact
import { createContext } from "preact";
import { useState } from "preact/hooks";

interface GlobalContextType {
  isLogoutDialogOpen: boolean;
  setIsLogoutDialogOpen: React.Dispatch<boolean>;
}
export const globalContext = createContext<GlobalContextType>({
  isLogoutDialogOpen: false,
  setIsLogoutDialogOpen: () => {},
});

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
