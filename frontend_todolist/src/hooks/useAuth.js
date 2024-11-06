import { useState, useEffect } from "react";
import { login, logout } from "../services/authService";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Check the user's login status on component mount
    const verifyAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/verify`, { withCredentials: true });
        if (response.data.isAuthenticated) {
          setIsSignedIn(true);
          console.log(response.data.user);
          setUser(response.data.user);  // Set user details if needed
        }
      } catch (error) {
        setIsSignedIn(false);
      }
    };

    verifyAuth();
  }, []);

  const handleLogin = async () => {
    await login()
  };

  const handleLogout = async () => {
    await logout();
    setIsSignedIn(false);
    setUser(null);
  };

  return {
    user,
    isSignedIn,
    handleLogin,
    handleLogout
  };
};
