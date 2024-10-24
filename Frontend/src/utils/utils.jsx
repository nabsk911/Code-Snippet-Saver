export const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Convert UTC date to Nepali time (UTC + 5 hours 45 minutes)
  const nepaliTimeOffset = 5 * 60 + 45; // Total minutes difference
  date.setMinutes(date.getMinutes() + nepaliTimeOffset);

  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffSeconds < 60) {
    return "Just now";
  } else if (diffMinutes < 60) {
    return diffMinutes === 1 ? "1 minute ago" : `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
  } else if (diffDays < 7) {
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  } else {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
};

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
