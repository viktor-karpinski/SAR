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
  events: Array<Object> | null;
  setEvents: (events: Array<object>) => void;
  hasEvents: Boolean | null;
  setHasEvent: (hasEvents: Boolean) => void;
  stackHome: Boolean | null;
  setStackHome: (hasEvents: Boolean) => void;
  currentEvent: Object | null;
  setCurrentEvent: (event: Object) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [firebaseToken, setFirebaseToken] = useState<string | null>(null);
  const [users, setUsers] = useState<Array<object>>([]);
  const [user, setUser] = useState<object>({});
  const apiURL = "https://sar.viktorkarpinski.com/api/";
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [ events, setEvents ] = useState<Array<Object>>([]);
  const [ hasEvents, setHasEvent ] = useState<Boolean>(false);
  const [ stackHome, setStackHome ] = useState<Boolean>(false);
  const [ currentEvent, setCurrentEvent ] = useState<Object | null>(null);

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
        events, 
        setEvents,
        hasEvents, 
        setHasEvent,
        stackHome,
        setStackHome,
        currentEvent,
        setCurrentEvent
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
