import { LuSun, LuMoon } from "react-icons/lu";
import { Button } from "./ui/button";
import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button variant="outline" onClick={toggleTheme}>
      {theme === "light" ? <LuMoon /> : <LuSun />}
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </Button>
  );
}
