import React, { useState, useEffect, createContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { Toaster } from "@/components/ui/sonner";

export const logStatusContext = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  // Check if 7 days have passed since login and log out the user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const currentTime = new Date().getTime();
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

      if (currentTime - user.loginTimestamp > sevenDaysInMs) {
        setIsLoggedIn(false);
      }
    }
  }, []); // This will run once when the component is mounted

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? (
        <Navigate to="/home" />
      ) : (
        <LoginPage onLogin={handleLogin} />
      ),
    },
    {
      path: "/login",
      element: isLoggedIn ? (
        <Navigate to="/home" />
      ) : (
        <LoginPage onLogin={handleLogin} />
      ),
    },
    {
      path: "/register",
      element: isLoggedIn ? <Navigate to="/home" /> : <RegisterPage />,
    },
    {
      path: "/home",
      element: isLoggedIn ? (
        <logStatusContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <HomePage />
        </logStatusContext.Provider>
      ) : (
        <Navigate to="/login" />
      ),
    },
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
