import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "@/components/theme-provider";

const CodeHighlighter = ({ code, language }) => {
  const [customHeight, setCustomHeight] = useState("50vh");
  const { theme } = useTheme(); // Use the theme context instead of local state

  useEffect(() => {
    // Adjust height based on the window width (viewport)
    const handleResize = () => {
      if (window.innerWidth < 415) {
        setCustomHeight("35vh");
      } else {
        setCustomHeight("50vh");
      }
    };

    handleResize();

    // Add event listener with debounce to improve performance
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);

    // Cleanup event listener and timeout on unmount
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Choose the syntax highlighting theme based on the current theme
  const syntaxTheme = theme === "dark" ? oneDark : oneLight;

  const customStyle = {
    paddingTop: "4rem",
    position: "relative",
    maxHeight: customHeight,
    overflow: "auto",
    borderRadius: "1rem",
  };

  return (
    <div className="relative w-full">
      <SyntaxHighlighter
        language={language}
        style={syntaxTheme}
        customStyle={customStyle}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeHighlighter;
