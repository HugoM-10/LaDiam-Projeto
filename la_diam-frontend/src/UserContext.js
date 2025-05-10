import React, { createContext, useState, useEffect } from "react";
import { fetchUser } from "./BackendCalls/getters";
import { logoutUser, loginUser,updateUser } from "./BackendCalls/posters";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

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
      setUser(fetchedUser || null);
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

  const editUser = async (user) => {
    try {
      const updatedUser = await updateUser(user);
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error("Error in editUser:", error);
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
    <UserContext.Provider value={{ user, login, logout, editUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
