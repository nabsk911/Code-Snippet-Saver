import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "@/components/theme-provider";

const CodeHighlighter = ({ code, language }) => {
  const { theme } = useTheme(); // Use the theme context instead of local state

  // Choose the syntax highlighting theme based on the current theme
  const syntaxTheme = theme === "dark" ? oneDark : oneLight;

  return (
    <div className="relative w-full max-h-[40vh] xs:max-h-[55vh] overflow-auto">
      <SyntaxHighlighter language={language} style={syntaxTheme}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeHighlighter;
