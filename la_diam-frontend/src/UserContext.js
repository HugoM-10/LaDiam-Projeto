import React, { createContext, useState, useEffect, useCallback } from "react";
import { fetchUser } from "./BackendCalls/getters";
import { logoutUser, loginUser, updateUser, signupUser } from "./BackendCalls/posters";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const fetchAndSetUser = useCallback(async () => {
    try {
      const fetched = await fetchUser();
      setUser(fetched || null);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchAndSetUser();
  }, [fetchAndSetUser]);

  const login = async (username, password) => {
    try {
      await loginUser(username, password);
      await fetchAndSetUser();
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error };
    }
  };

  const editUser = async (userData) => {
    try {
      const updated = await updateUser(userData);
      setUser(updated);
      return { success: true };
    } catch (error) {
      console.error("User update failed:", error);
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(undefined);
    }
  };
  const signup = async (username, email, password) => {
    try {
      const response = await signupUser(username, password, email);
      setUser(response.data);
      return { success: true };
    } catch (error) {
      console.error("Signup failed:", error);
      return { success: false, error };
    }
  };

  const isLoggedIn = user !== undefined && user !== null;

  const contextValue = React.useMemo(() => ({
    user,
    login,
    logout,
    editUser,
    isLoggedIn,
    signup,
  }), [user, login, logout, editUser, isLoggedIn, signup]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
