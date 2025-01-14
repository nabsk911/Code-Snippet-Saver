import AutnInput from "../components/ui/AuthInput";
import { useState } from "react";
import { validateEmail } from "../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MainImage from "../assets/MainImage.png";

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

export default RegisterPage;
