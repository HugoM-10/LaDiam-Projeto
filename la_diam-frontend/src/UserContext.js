import React, { createContext, useState, useEffect } from "react";
import { fetchUser } from "./BackendCalls/getters";
import { logoutUser, loginUser } from "./BackendCalls/posters";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleFetchUser = async () => {
    try {
      const user = await fetchUser();
      return user;
    } catch (error) {
      console.error("Error in handleFetchUser:", error);
      return null;
    }
  };

  useEffect(() => {
    const init = async () => {
      const fetchedUser = await handleFetchUser();
      if (fetchedUser) {
        setUser(fetchedUser);
      }
    };

    init();
  }, []);

  const login = async (user, password) => {
    try {
      await loginUser(user, password);
      const fetchedUser = await handleFetchUser();
      setUser(fetchedUser);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false };
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.error("Error in handleLogout:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
