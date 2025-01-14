import AuthInput from "../components/ui/AuthInput";
import { useState } from "react";
import { validateEmail } from "../utils/utils";
import { Link, redirect } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MainImage from "../assets/MainImage.png";

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
      const response = await fetch(
        `http://localhost:8080/api/user/authenticate?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }

      const user = await response.json();
      const loginTimestamp = new Date().getTime();
      localStorage.setItem("user", JSON.stringify({ ...user, loginTimestamp }));
      onLogin(); // Call the onLogin function passed as prop
      redirect("/home"); // Navigate to home page after successful login
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex box-border justify-center items-center">
      {/* Container for the form and the image */}
      <div className="rounded-2xl flex max-w-3xl p-5  border-2 border-border">
        {/* Form Section */}
        <div className="md:w-1/2 px-8">
          <p className="text-3xl  font-bold  mb-1">Welcome Back!</p>
          <p className="text-base  mt-4">Please enter your details.</p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
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

          <p className="text-center mt-10">
            Don't have an account?{" "}
            <Link className="cursor-pointer font-bold" to="/register">
              Sign Up
            </Link>
          </p>
        </div>
        {/* Image Section */}
        <div className="w-1/2  md:flex hidden bg-secondary rounded-lg">
          <img
            src={MainImage}
            height={800}
            width={800}
            alt="Main"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
