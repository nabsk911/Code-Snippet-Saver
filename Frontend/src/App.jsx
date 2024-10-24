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

  useEffect(() => {
    // Apply saved theme from localStorage globally
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

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
