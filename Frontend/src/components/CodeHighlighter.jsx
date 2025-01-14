import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "@/components/theme-provider";

const CodeHighlighter = ({ code, language }) => {
  const { theme } = useTheme(); // Use the theme context instead of local state

  // Choose the syntax highlighting theme based on the current theme
  const syntaxTheme = theme === "dark" ? oneDark : oneLight;

  return (
    <SyntaxHighlighter
      language={language}
      style={syntaxTheme}
      customStyle={{
        borderRadius: "1rem",
        paddingTop: "4rem",
      }}
      className="overflow-auto relative w-full max-h-[40vh] xs:max-h-[55vh] "
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeHighlighter;
