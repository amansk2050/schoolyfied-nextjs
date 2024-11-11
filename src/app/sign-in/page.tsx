"use client";
import React from "react";
import axios from "axios";

const SignIn = () => {
  interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
  }

  interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

  const handleSubmit = async (e: React.FormEvent<SignInFormElement>) => {
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const email = data.get("email") as string;
      const password = data.get("password") as string;
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        if (typeof window !== "undefined") window.location.href = "/admin";
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-loginBackground">
      <div className="flex flex-col bg-white rounded-2xl py-10 px-10 shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
        {/* HEADING */}
        <h1 className="font-bold text-xl">Welcome Back</h1>
        <p className="text-xs">
          Not registered yet?{" "}
          <a href="#" className="font-semibold text-sm p-2">
            Get Started Now
          </a>
        </p>

        {/* SIGNIN FORM */}
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded-md font-medium"
            style={{ backgroundColor: "#F9F8FE" }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded-md font-medium"
            style={{ backgroundColor: "#F9F8FE" }}
          />
          <button className="bg-purpleButton text-white p-2 rounded-md w-1/2 self-center font-bold">
            Sign In
          </button>
        </form>

        {/* BOTTOM */}
        <div className="flex justify-center items-center mt-4">
          <a href="#" className="text-xs">
            Forgotten your Password or your login details
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
