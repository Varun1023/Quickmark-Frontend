"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import API from "@/utils/api";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    rollNo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole, rollNo: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //await axios.post("http://localhost:5600/api/auth/signup", formData);
      API.post("/api/auth/signup", formData);
      toast.success("Account Created Successfully✅")
      router.push("/login");
      
    } catch (err) {
      toast.error("Error in Creating your Account❌")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-slate-200 px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT — SIGNUP FORM */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800">
            Create Account
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Secure, proxy-free attendance with QuickMark
          </p>
          <ToastContainer/>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1 w-full rounded-lg bg-slate-100 px-3 py-2.5 text-sm
                  border border-transparent focus:border-indigo-400
                  focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg bg-slate-100 px-3 py-2.5 text-sm
                  border border-transparent focus:border-indigo-400
                  focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg bg-slate-100 px-3 py-2.5 text-sm
                  border border-transparent focus:border-indigo-400
                  focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            {/* ROLE SELECTION */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">
                Sign up as
              </label>

              <div className="flex gap-3">
                <div
                  onClick={() => handleRoleChange("student")}
                  className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 text-center transition
                    ${
                      formData.role === "student"
                        ? "border-indigo-500 bg-indigo-50 shadow-sm"
                        : "border-slate-200 bg-slate-100 hover:bg-slate-200"
                    }`}
                >
                  <div className="text-xl">🎓</div>
                  <p className="text-sm font-medium text-slate-800">
                    Student
                  </p>
                </div>

                <div
                  onClick={() => handleRoleChange("faculty")}
                  className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 text-center transition
                    ${
                      formData.role === "faculty"
                        ? "border-indigo-500 bg-indigo-50 shadow-sm"
                        : "border-slate-200 bg-slate-100 hover:bg-slate-200"
                    }`}
                >
                  <div className="text-xl">👨‍🏫</div>
                  <p className="text-sm font-medium text-slate-800">
                    Faculty
                  </p>
                </div>
              </div>
            </div>

            {/* CONDITIONAL FIELD */}
            {formData.role === "student" ? (
              <div>
                <label className="block text-xs font-medium text-slate-700">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="rollNo"
                  onChange={handleChange}
                  placeholder="STU12345"
                  className="mt-1 w-full rounded-lg bg-slate-100 px-3 py-2.5 text-sm
                    border border-transparent focus:border-indigo-400
                    focus:ring-2 focus:ring-indigo-300 outline-none"
                />
              </div>
            ) : null}

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full mt-3 bg-gradient-to-r from-indigo-600 to-purple-600
                text-white py-2.5 rounded-lg text-sm font-semibold
                hover:opacity-95 transition"
            >
              Create Account
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-500">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>

        {/* RIGHT — INFO */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_white,_transparent_60%)]" />

          <div className="relative z-10 max-w-md px-8 text-white">
            <h3 className="text-2xl font-bold">
              Get started with QuickMark
            </h3>

            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              A modern attendance platform built to eliminate proxy attendance
              using secure, time-bound QR sessions.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-white"></span>
                <span>Time-limited QR attendance</span>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-white"></span>
                <span>Role-based dashboards</span>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-white"></span>
                <span>Secure & scalable design</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
