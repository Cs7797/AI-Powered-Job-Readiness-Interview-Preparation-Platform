import { createContext, useState } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  return (
    <authContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        authChecked,
        setAuthChecked,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
