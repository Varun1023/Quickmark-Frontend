"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import API from "@/utlis/api"; // ✅ centralized API

import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import ActionCard from "@/components/ActionCard";

export default function StudentDashboard() {
  const [overview, setOverview] = useState({
    attendance: 0,
    attended: 0,
    missed: 0,
  });

  const subjects = [
    { name: "Mathematics", percentage: 0 },
    { name: "Operating Systems", percentage: 0 },
    { name: "Computer Networks", percentage: 0 },
    { name: "Database Systems", percentage: 0 },
  ];

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = Cookies.get("token");

        const res = await API.get(
          "/api/student-dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOverview({
          attendance: res.data.attendancePercentage,
          attended: res.data.classesAttended,
          missed: res.data.classesMissed,
        });
      } catch (error) {
        console.error("Failed to load student dashboard stats", error);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="space-y-8">
      <Header
        title="Student Dashboard"
        subtitle="Track your attendance and stay on top of your classes"
      />

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Attendance %" value={`${overview.attendance}%`} />
        <StatCard title="Classes Attended" value={overview.attended} />
        <StatCard title="Classes Missed" value={overview.missed} />
      </section>

      <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-base font-semibold text-slate-800">
            Subject-wise Attendance
          </h2>
          <span className="text-xs text-slate-500">
            Minimum required: 75%
          </span>
        </div>

        <div className="divide-y divide-slate-200">
          {subjects.map((subject, index) => {
            const isSafe = subject.percentage >= 75;

            return (
              <div
                key={index}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <span className="text-sm font-medium text-slate-700">
                  {subject.name}
                </span>

                <div className="flex items-center gap-3">
                  <div className="w-36 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isSafe ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                      style={{ width: `${subject.percentage}%` }}
                    />
                  </div>

                  <span
                    className={`text-sm font-semibold ${
                      isSafe ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {subject.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ActionCard
          title="Scan Attendance QR"
          description="Scan the QR code shared by faculty to mark attendance"
          href="/student/scan"
          primary
        />

        <ActionCard
          title="View Attendance History"
          description="Check your past attendance records"
          href="#"
        />
      </section>
    </div>
  );
}
