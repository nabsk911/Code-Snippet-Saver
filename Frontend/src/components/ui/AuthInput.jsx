import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const AuthInput = ({
  id,
  label,
  type,
  value,
  onChange,
  showPasswordToggle,
  errorMessage,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mt-10 ">
      <label
        htmlFor={id}
        className={`absolute transition-all duration-300 cursor-text text-foreground font-bold ${
          isFocused || value
            ? "transform -translate-y-6 -translate-x-1 scale-[0.9] font-bold"
            : ""
        }`}
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        className="w-full border-b bg-background pb-4 border-foreground focus:outline-none"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(value !== "");
        }}
        onChange={onChange}
      />
      {errorMessage && <div className="text-destructive-foreground mt-1">{errorMessage}</div>}

      {showPasswordToggle && (
        <span
          className="absolute top-0 right-3 cursor-pointer"
          onClick={showPasswordToggle}
        >
          {type === "text" ? (
            <LuEye size={25} strokeWidth={1} />
          ) : (
            <LuEyeOff size={25} strokeWidth={1} />
          )}
        </span>
      )}
    </div>
  );
};

export default AuthInput;
