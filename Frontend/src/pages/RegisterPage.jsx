import AutnInput from "../components/ui/AuthInput";
import { useState } from "react";
import { validateEmail } from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const validatePassword = (password) => {
  return password.length >= 6;
};

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Validate inputs
    if (
      !email ||
      !validateEmail(email) ||
      !validatePassword(password) ||
      !password ||
      !name
    ) {
      return;
    }

    // User data to be sent in the request
    const userData = {
      name,
      email,
      password,
    };

    // Try to register the user
    try {
      const response = await fetch("http://localhost:8080/api/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }

      toast.success("Registration successful!", {
        description: "Login to continue.",
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.message, {
        description: "Use another Email to create a new account.",
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border border-border rounded-lg p-10">
        <p className="text-3xl font-bold text-center mb-1">Create account</p>
        <p className="text-base text-center">Let's get started.</p>
        <form onSubmit={handleSubmit} noValidate>
          <AutnInput
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            errorMessage={
              formSubmitted && !name ? "Please enter your name" : ""
            }
          />

          <AutnInput
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
          <AutnInput
            id="password"
            label="Password"
            type={!showPassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPasswordToggle={handleShowPassword}
            errorMessage={
              formSubmitted && !password
                ? "Please enter your password"
                : formSubmitted && !validatePassword(password)
                ? "Use 6 characters or more for your password"
                : ""
            }
          />

          <Button className="w-full mt-10">Sign Up</Button>
        </form>

        <p className="text-center mt-10">
          Already have an account?{" "}
          <Link className="cursor-pointer font-bold" to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
