"use client";

import ActionCard from "@/components/ActionCard";
import StatCard from "@/components/StatCard";

export default function FacultyDashboard() {
  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-xl font-semibold text-slate-800">
          Faculty Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Generate QR codes and manage attendance sessions
        </p>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Total Classes" value="32" />
        <StatCard title="Sessions Today" value="2" />
        <StatCard title="Students Present" value="—" />
      </div>

      {/* PRIMARY ACTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <ActionCard
          title="Generate Attendance QR"
          description="Create a QR code for the current class session"
          href="/faculty/generate-qr"
          primary
        />

        <ActionCard
          title="View Attendance Records"
          description="Check attendance history of previous sessions"
          href="#"
        />
      </div>

      {/* INFO CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-semibold text-slate-700">
          How QR Attendance Works
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>• Generate a QR code at the start of class</li>
          <li>• Students scan the QR using QuickMark</li>
          <li>• QR expires automatically after a short time</li>
          <li>• Attendance is marked instantly</li>
        </ul>
      </div>

    </div>
  );
}
