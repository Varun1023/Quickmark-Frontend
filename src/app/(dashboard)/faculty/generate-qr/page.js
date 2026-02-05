"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import API from "@/utils/api"; // ✅ FIX PATH

export default function GenerateQRPage() {
  const [subject, setSubject] = useState("");
  const [period, setPeriod] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [markedCount, setMarkedCount] = useState(0);

  const subjects = [
    "Operating Systems",
    "Database Systems",
    "Computer Networks",
    "Software Engineering",
  ];

  const periods = ["1", "2", "3", "4", "5", "6", "7"];

  // 🔐 Generate QR (FACULTY)
  const handleGenerate = async () => {
    if (!subject || !period) return;

    setLoading(true);
    setMarkedCount(0);
    setSessionToken("");

    try {
      const token = Cookies.get("token");

      const response = await API.post(
        "/api/attendance/generate-qr",
        { subjectId: subject, period }, // ✅ include period
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQrDataUrl(response.data.qrCode);
      setSessionToken(response.data.sessionToken);
    } catch (error) {
      console.error("QR generation failed", error);
      alert("Failed to generate QR");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 LIVE ATTENDANCE COUNT (POLLING)
  useEffect(() => {
    if (!sessionToken) return;

    const token = Cookies.get("token");

    const interval = setInterval(async () => {
      try {
        const res = await API.get(
          `/api/attendance/count/${sessionToken}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMarkedCount(res.data.count);
      } catch (err) {
        console.error("Failed to fetch attendance count", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [sessionToken]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-xl font-semibold">Generate Attendance QR</h1>

      <div className="bg-white p-6 rounded-xl text-center">
        {qrDataUrl ? (
          <>
            <img src={qrDataUrl} alt="QR" className="mx-auto h-56 w-56" />
            <p className="mt-2 text-indigo-600">
              👥 {markedCount} students marked
            </p>
            <button
              onClick={() => setFullscreen(true)}
              className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Full Screen
            </button>
          </>
        ) : (
          <p className="text-slate-400">QR will appear here</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl space-y-4">
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select subject</option>
          {subjects.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select period</option>
          {periods.map((p) => (
            <option key={p} value={p}>Period {p}</option>
          ))}
        </select>

        <button
          onClick={handleGenerate}
          disabled={!subject || !period || loading}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          {loading ? "Generating..." : "Generate QR"}
        </button>
      </div>
    </div>
  );
}
