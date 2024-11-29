import React, { createContext, useState, useContext } from "react";


interface AppContextType {
    isLoggedIn: boolean;
    toogleLogout: () => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const toogleLogout = () => setLoggedIn(!isLoggedIn);

  return (
    <AppContext.Provider value={{ isLoggedIn, toogleLogout }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};
