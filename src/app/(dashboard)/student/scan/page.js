"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Cookies from "js-cookie";
import API from "@/utils/api"; 

export default function StudentScanPage() {
  const scannerRef = useRef(null);

  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState("idle");
  // idle | success | expired | already | invalid | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    return () => stopScanner();
  }, []);

  const startScanner = async () => {
    setStatus("idle");
    setMessage("");

    const html5QrCode = new Html5Qrcode("qr-reader");
    scannerRef.current = html5QrCode;

    try {
      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => handleScan(decodedText),
        () => {}
      );
      setScanning(true);
    } catch {
      setStatus("invalid");
      setMessage("Camera permission denied.");
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      } catch {}
      scannerRef.current = null;
    }
    setScanning(false);
  };

  // 🔥 REAL BACKEND ATTENDANCE MARKING
  const handleScan = async (decodedText) => {
    stopScanner();

    let sessionToken;

    try {
      const data = JSON.parse(decodedText);
      sessionToken = data.sessionToken;
    } catch {
      setStatus("invalid");
      setMessage("Invalid QR code.");
      return;
    }

    if (!sessionToken) {
      setStatus("invalid");
      setMessage("Invalid QR code.");
      return;
    }

    try {
      const token = Cookies.get("token"); // STUDENT JWT

      await API.post(
        "/api/attendance/mark",
        { sessionToken },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ SUCCESS
      setStatus("success");
      setMessage("Attendance marked successfully!");
    } catch (err) {
      const msg = err?.response?.data?.message;

      if (msg === "Attendance already marked") {
        setStatus("already");
        setMessage("Attendance already marked.");
      } else if (msg === "QR session expired") {
        setStatus("expired");
        setMessage("This QR code has expired.");
      } else {
        setStatus("error");
        setMessage("Invalid or expired QR code.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold text-slate-800">
          Scan Attendance QR
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Scan the QR code shown by your faculty
        </p>
      </div>

      {/* SCANNER */}
      {status === "idle" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div
            id="qr-reader"
            className="aspect-square rounded-xl bg-slate-100"
          />

          <button
            onClick={startScanner}
            disabled={scanning}
            className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition"
          >
            {scanning ? "Scanning..." : "Start Scanning"}
          </button>
        </div>
      )}

      {/* RESULT STATES */}
      {status !== "idle" && (
        <div
          className={`rounded-2xl border p-6 text-center ${
            status === "success"
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <p
            className={`text-lg font-semibold ${
              status === "success" ? "text-green-700" : "text-red-700"
            }`}
          >
            {status === "success" ? "✅ Success" : "❌ Failed"}
          </p>

          <p className="mt-2 text-sm text-slate-700">{message}</p>

          <button
            onClick={() => setStatus("idle")}
            className="mt-5 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900 transition"
          >
            Scan Again
          </button>
        </div>
      )}
    </div>
  );
}
