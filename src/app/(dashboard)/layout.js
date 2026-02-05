"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { LayoutDashboard, QrCode, LogOut } from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isStudent = pathname.startsWith("/student");
  const isFaculty = pathname.startsWith("/faculty");

  const handleLogout = () => {
    // 🔐 Remove auth cookies
    Cookies.remove("token");
    Cookies.remove("role");

    // Close sidebar (mobile)
    setOpen(false);

    // Redirect to login
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0
        `}
      >
        {/* LOGO */}
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-xl font-bold text-indigo-600">QuickMark</h1>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          {isStudent && (
            <>
              <NavItem
                href="/student/dashboard"
                active={pathname === "/student/dashboard"}
                icon={<LayoutDashboard size={18} />}
                onClick={() => setOpen(false)}
              >
                Dashboard
              </NavItem>

              <NavItem
                href="/student/scan"
                active={pathname === "/student/scan"}
                icon={<QrCode size={18} />}
                onClick={() => setOpen(false)}
              >
                Scan QR
              </NavItem>
            </>
          )}

          {isFaculty && (
            <>
              <NavItem
                href="/faculty/dashboard"
                active={pathname === "/faculty/dashboard"}
                icon={<LayoutDashboard size={18} />}
                onClick={() => setOpen(false)}
              >
                Dashboard
              </NavItem>

              <NavItem
                href="/faculty/generate-qr"
                active={pathname === "/faculty/generate-qr"}
                icon={<QrCode size={18} />}
                onClick={() => setOpen(false)}
              >
                Generate QR
              </NavItem>
            </>
          )}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold
              bg-red-600 text-white hover:bg-red-700 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="md:hidden rounded-lg p-2 hover:bg-slate-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="leading-tight">
              <p className="text-xs text-slate-500">
                {isStudent ? "Student Portal" : "Faculty Portal"}
              </p>
              <h2 className="text-sm md:text-base font-semibold text-slate-800">
                {isStudent ? "Student Dashboard" : "Faculty Dashboard"}
              </h2>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-700">
                {isStudent ? "Student" : "Faculty"}
              </p>
            </div>

            <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              V
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

/* ---------------- NAV ITEM ---------------- */

function NavItem({ href, active, icon, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition
        ${
          active
            ? "bg-indigo-50 text-indigo-600"
            : "text-slate-600 hover:bg-slate-100"
        }`}
    >
      <span className={active ? "text-indigo-600" : "text-slate-400"}>
        {icon}
      </span>
      <span>{children}</span>
    </Link>
  );
}
