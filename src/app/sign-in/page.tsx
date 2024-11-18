"use client";
import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";


const SignIn = () => {
  const router = useRouter();
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
      if (!email) {
        toast.error("Email is required", {
          autoClose: 3000, // 3 seconds
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Invalid email format", {
          autoClose: 3000, // 3 seconds
        });
        return;
      }

      if (!password) {
        toast.error("Password is required", {
          autoClose: 3000, // 3 seconds
        });
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        router.push("/admin");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-lamaPurple to-lamaSky">
      <div className="w-1/2">
        <div className="flex flex-col bg-white rounded-2xl shadow-lg p-10">
          {/* HEADING */}
          <h1 className="font-bold text-xl">Welcome Back</h1>
          <p className="text-xs">
            Not registered yet?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-sm p-2  hover:text-blue-500"
            >
              Get Started Now
            </Link>
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
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </form>

          {/* BOTTOM */}
          <div className="flex justify-center items-center mt-4  hover:text-blue-500">
            <Link href="#" className="text-xs">
              Forgotten your Password or your login details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
