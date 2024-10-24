import AuthInput from "../components/ui/AuthInput";
import { useState } from "react";
import { validateEmail } from "../utils/utils";
import axios from "axios";
import { Link, redirect } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const LoginPage = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Function to toggle showPassword state
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Check if email and password are valid
    if (!email || !validateEmail(email) || !password) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/authenticate",
        null,
        {
          params: { email, password },
        }
      );

      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        onLogin(); // Call the onLogin function passed as prop
        redirect("/home"); // Navigate to home page after successful login
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border border-border rounded-lg p-10">
        <p className="text-3xl font-bold text-center mb-1">Welcome Back!</p>
        <p className="text-base text-center ">Please enter your details.</p>

        <form onSubmit={handleSubmit} noValidate>
          <AuthInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            errorMessage={
              formSubmitted && !email
                ? "Please enter your email"
                : formSubmitted && !validateEmail(email)
                ? "Invalid email format"
                : ""
            }
          />
          <AuthInput
            id="password"
            label="Password"
            type={!showPassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPasswordToggle={handleShowPassword}
            errorMessage={
              formSubmitted && !password ? "Please enter your password" : ""
            }
          />

          <Button className="w-full mt-10">Sign In</Button>
        </form>

        <p className=" text-center mt-10">
          Don't have an account?{" "}
          <Link className="cursor-pointer font-bold" to="/register">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
