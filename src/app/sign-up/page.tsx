"use client";
import React from "react";
import axios from "axios";
import { UserRoles } from "@/enums/roleEnumHelper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
const SignUp = () => {
  const router = useRouter();
  // onSubmit function
  interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    fullName: HTMLInputElement;
    confirmPassword: HTMLInputElement;
    role: HTMLSelectElement;
  }
  interface SignUpFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }
  const handleSubmit = async (e: React.FormEvent<SignUpFormElement>) => {
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const email = data.get("email") as string;
      const password = data.get("password") as string;
      const fullName = data.get("fullName") as string;
      const confirmPassword = data.get("confirmPassword") as string;
      const role = data.get("role") as string;

      if (!fullName) {
        toast.error("Full name is required", {
          autoClose: 3000,
        });
        return;
      }

      if (!email) {
        toast.error("Email is required", {
          autoClose: 3000,
        });
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Invalid email format", {
          autoClose: 3000,
        });
        return;
      }
      if (!password) {
        toast.error("Password is required", {
          autoClose: 3000,
        });
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match", {
          autoClose: 3000, // 3 seconds
        });
        return;
      }
      if (!role) {
        toast.error("Role is required", {
          autoClose: 3000,
        });
        return;
      }
      console.log("info", email, password, fullName, confirmPassword, role);
      // API call
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        {
          fullName,
          email,
          password,
          roles: [role as UserRoles],
        }
      );
      if (response.status === 201) {
        toast.success("User created successfully", {
          autoClose: 3000,
        });
        router.push(`/onboard?fullName=${encodeURIComponent(fullName)}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      }
      toast.error("An unexpected error occurred");
    }
  };
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-lamaPurple to-lamaSky">
      <div className="w-1/2">
        <div className="flex flex-col bg-white rounded-2xl shadow-lg p-12">
          {/* HEADING */}
          <h1 className="font-bold text-xl">Get Started</h1>
          <p className="text-xs">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-sm p-2 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>

          {/* FORM */}
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            <input
              type="fullName"
              name="fullName"
              placeholder="Full name"
              className="p-2 border border-gray-300 rounded-md font-medium"
              style={{ backgroundColor: "#F9F8FE" }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-2 border border-gray-300 rounded-md font-medium"
              style={{ backgroundColor: "#F9F8FE" }}
            />
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="p-2 border border-gray-300 rounded-md font-medium w-1/2"
                style={{ backgroundColor: "#F9F8FE" }}
              />
              <input
                type="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                className="p-2 border border-gray-300 rounded-md font-medium w-1/2"
                style={{ backgroundColor: "#F9F8FE" }}
              />
            </div>
            <select
              name="role"
              className="p-2 border border-gray-300 rounded-md font-medium"
              style={{
                backgroundColor: "#F9F8FE",
                maxHeight: "150px", // Adjust the height as needed
                overflowY: "auto",
                //   color: "#6B7280", // Assuming this is the color of the input field text
                fontSize: "1rem", // Assuming this is the font size of the input field text
              }}
              defaultValue=""
            >
              <option value="" disabled selected style={{ color: "#6B7280" }}>
                Select Role
              </option>
              {Object.values(UserRoles).map((role) => (
                <option key={role} value={role}>
                  {role.replace("_", " ").toLowerCase()}
                </option>
              ))}
            </select>
            <button className="bg-purpleButton text-white p-2 rounded-md w-1/2 self-center font-bold">
              Start Onboarding
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
          <div className="flex justify-center items-center mt-4">
            <Link href="#" className="text-xs  hover:text-blue-500">
              Forgotten your Password or your login details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
