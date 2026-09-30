import { useContext, useEffect } from "react";

import { authContext } from "../context/auth.context.jsx";

import {
  loginUser,
  logout,
  registerUser,
  fetchdata,
} from "../service/authservice";

export const useAuth = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { user, setUser, loading, setLoading, authChecked, setAuthChecked } =
    context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
      const data = await loginUser({
        email,
        password,
      });

      setUser(data.user);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);

    try {
      const data = await registerUser({
        username,
        email,
        password,
      });

      setUser(data.user);

      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      await logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      const data = await fetchdata();

      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    loading,
    authChecked,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
