import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"; // Light theme

const CodeHighlighter = ({ code, language }) => {
  const [theme, setTheme] = useState("light");
  const [customHeight, setCustomHeight] = useState("50vh");

  useEffect(() => {
    // Get the saved theme from localStorage (similar to the ThemeToggle component)
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    // Adjust height based on the window width (viewport)
    const handleResize = () => {
      if (window.innerWidth < 415) {
        setCustomHeight("40vh"); // Smaller height for small screens
      } else {
        setCustomHeight("50vh"); // Default height for larger screens
      }
    };

    // Initial check
    handleResize();

    // Add event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Choose the syntax highlighting theme based on the current theme
  const syntaxTheme = theme === "dark" ? oneDark : oneLight;

  const customStyle = {
    paddingTop: "4rem",
    position: "relative",
    maxHeight: customHeight, // Use the dynamic height
    overflow: "auto",
    borderRadius: "1rem",
  };

  return (
    <SyntaxHighlighter
      language={language}
      style={syntaxTheme}
      customStyle={customStyle}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeHighlighter;
