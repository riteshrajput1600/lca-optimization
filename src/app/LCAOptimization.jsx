"use client";
import React, { useEffect, useState } from "react";
import { fetchLCAData, submitReviewDecision } from "./lcaApi";

export default function LCAOptimization() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionStatus, setActionStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchLCAData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const handleAction = async (type) => {
    setActionStatus("loading");
    setMessage("");
    try {
      await submitReviewDecision(type);
      setActionStatus("success");
      setMessage(
        type === "approved"
          ? "Suggestion approved successfully!"
          : "Suggestion rejected."
      );
    } catch {
      setActionStatus("error");
      setMessage(
        "Something went wrong. Please try again. (Note: This is a simulated failure using Math.random to mimic real-world API errors.)"
      );
    }

  };


  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></span>
      </div>
    );
  }

  const percentReduction = (
    ((data.originalLCA - data.optimizedLCA) / data.originalLCA) *
    100
  ).toFixed(1);

  return (
    <div className="max-w-md mx-auto bg-black shadow-xl rounded-xl p-6 mt-8 flex flex-col gap-6 border border-gray-700">
      <h2 className="text-xl font-semibold text-white mb-2">
        AI-Driven LCA Optimization Review
      </h2>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm">Original Crate LCA</span>
          <span className="text-2xl font-bold text-red-400">
            {data.originalLCA} kg CO₂e
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm">
            AI-Suggested Optimized Crate LCA
          </span>
          <span className="text-2xl font-bold text-green-400">
            {data.optimizedLCA} kg CO₂e
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full font-medium">
          ↓ {percentReduction}% reduction
        </span>
      </div>

      <div className="bg-gray-900 p-3 rounded text-gray-300 text-sm">
        <strong className="text-white">Reason:</strong> {data.reason}
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
          disabled={actionStatus === "loading"}
          onClick={() => handleAction("approved")}
        >
          Approve
        </button>
        <button
          className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
          disabled={actionStatus === "loading"}
          onClick={() => handleAction("rejected")}
        >
          Reject
        </button>

      </div>

      {message && (
        <div
          className={`mt-2 text-center text-sm ${actionStatus === "success"
              ? "text-green-400"
              : actionStatus === "error"
                ? "text-red-400"
                : ""
            }`}
        >
          {message}
        </div>
      )}
    </div>
  );

}
