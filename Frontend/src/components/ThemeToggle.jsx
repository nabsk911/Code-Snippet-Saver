import { useState, useEffect } from "react";
import { LuSun, LuMoon } from "react-icons/lu";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme); // Save theme preference
  };

  return (
    <Button variant="outline" onClick={toggleTheme}>
      {theme === "light" ? <LuMoon /> : <LuSun />}
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </Button>
  );
}
