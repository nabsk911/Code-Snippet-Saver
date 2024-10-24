// src/utils/utils.js

// Email Validation util
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// User Id Util
export const getUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.id : null;
};

// Language Utils
import {
  SiJavascript,
  SiPython,
  SiCsharp,
  SiCplusplus,
  SiRuby,
  SiPhp,
  SiSwift,
  SiGo,
  SiTypescript,
  SiKotlin,
  SiRust,
  SiScala,
  SiHtml5,
  SiCss3,
  SiReact,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

// Exporting language icons as React components
export const languageIcons = {
  JavaScript: <SiJavascript />,
  Python: <SiPython />,
  Java: <FaJava />,
  Csharp: <SiCsharp />,
  Cpp: <SiCplusplus />,
  Ruby: <SiRuby />,
  PHP: <SiPhp />,
  Swift: <SiSwift />,
  Go: <SiGo />,
  TypeScript: <SiTypescript />,
  Kotlin: <SiKotlin />,
  Rust: <SiRust />,
  Scala: <SiScala />,
  HTML: <SiHtml5 />,
  CSS: <SiCss3 />,
  React: <SiReact />,
};

export const AllLanguages = [
  "JavaScript",
  "Python",
  "React",
  "Java",
  "Csharp",
  "Cpp",
  "Ruby",
  "PHP",
  "Swift",
  "Go",
  "TypeScript",
  "Kotlin",
  "Rust",
  "Scala",
  "HTML",
  "CSS",
];
