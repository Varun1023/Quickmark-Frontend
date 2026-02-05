"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import API from "@/utlis/api"; // 👈 important

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/auth/login", formData);

      const { token, user } = res.data;

      // Store auth data
      Cookies.set("token", token, {
        expires: 1,
        sameSite: "lax",
      });

      Cookies.set("role", user.role, {
        expires: 1,
      });

      toast.success("Login successful 🚀");

      // Redirect based on role
      if (user.role === "student") {
        router.push("/student/dashboard");
      } else {
        router.push("/faculty/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "Invalid credentials, try again"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-slate-200 px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT — FORM */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-slate-800 text-center">
            Login
          </h2>
          <p className="mt-2 text-slate-500 text-sm text-center">
            Sign in to access your QuickMark dashboard
          </p>

          <ToastContainer />

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                onChange={handleChange}
                className="mt-1 w-full rounded-xl bg-slate-100 px-4 py-3
                border border-transparent focus:border-indigo-400
                focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                onChange={handleChange}
                className="mt-1 w-full rounded-xl bg-slate-100 px-4 py-3
                border border-transparent focus:border-indigo-400
                focus:ring-2 focus:ring-indigo-300 outline-none"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Login as
              </label>
              <select
                name="role"
                onChange={handleChange}
                className="mt-1 w-full rounded-xl bg-slate-100 px-4 py-3
                border border-transparent focus:border-indigo-400
                focus:ring-2 focus:ring-indigo-300 outline-none"
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600
              text-white py-3 rounded-xl font-semibold
              hover:opacity-95 transition"
            >
              Login Now
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500 text-center">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>

        {/* RIGHT — VISUAL */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_white,_transparent_60%)]" />

          <div className="relative z-10 flex flex-col items-center text-center px-10">
            <Image
              src="/login-illustration.png"
              alt="Secure attendance illustration"
              width={300}
              height={300}
              className="drop-shadow-2xl"
              priority
            />

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-lg max-w-sm mt-6">
              <p className="text-white text-xl font-semibold">
                Secure. Simple. Smart.
              </p>
              <p className="text-white/80 text-sm mt-2">
                Attendance made effortless with QuickMark
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
