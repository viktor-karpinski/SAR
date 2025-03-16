import React, { createContext, useContext, useState, ReactNode } from "react";

type GlobalContextType = {
  apiToken: string | null;
  setApiToken: (token: string | null) => void;
  firebaseToken: string | null;
  setFirebaseToken: (token: string | null) => void;
  users: Array<object>;
  setUsers: (users: Array<object>) => void;
  user: object;
  setUser: (user: object) => void;
  apiURL: string;
  fcmToken: string | null;
  setFcmToken: (token: string | null) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [firebaseToken, setFirebaseToken] = useState<string | null>(null);
  const [users, setUsers] = useState<Array<object>>([]);
  const [user, setUser] = useState<object>({});
  const apiURL = "https://sar.viktorkarpinski.com/api/";
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  // In non-Expo projects, ensure your fonts are added and linked properly via your native config.
  // Similarly, manage your splash screen via react-native-splash-screen or similar if needed.

  return (
    <GlobalContext.Provider
      value={{
        apiToken,
        setApiToken,
        firebaseToken,
        setFirebaseToken,
        users,
        setUsers,
        user,
        setUser,
        apiURL,
        fcmToken,
        setFcmToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;
