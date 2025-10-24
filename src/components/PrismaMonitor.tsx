"use client";

import { useState, useEffect } from "react";
import {
  Database,
  Zap,
  Clock,
  TrendingUp,
  AlertCircle,
  Users,
} from "lucide-react";

interface PrismaHealth {
  status: string;
  database: {
    users: number;
    vendors: number;
    queryTime: string;
    accelerateQueryTime: string;
    performanceGain: string;
  };
  timestamp: string;
}

export default function PrismaMonitor() {
  const [health, setHealth] = useState<PrismaHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkHealth = async () => {
    try {
      const response = await fetch("/api/prisma/health");
      if (response.ok) {
        const data = await response.json();
        setHealth(data);
      }
    } catch (error) {
      console.error("Health check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Checking Prisma health...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Database className="w-5 h-5 text-blue-600" />
          <span>Prisma Data Platform</span>
        </h3>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            health?.status === "healthy"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {health?.status === "healthy" ? "Connected" : "Error"}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {health?.database.users || 0}
          </p>
          <p className="text-sm text-gray-600">Users</p>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {health?.database.vendors || 0}
          </p>
          <p className="text-sm text-gray-600">Vendors</p>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <p className="text-lg font-bold text-gray-900">
            {health?.database.queryTime || "0ms"}
          </p>
          <p className="text-sm text-gray-600">Query Time</p>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Zap className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
          <p className="text-lg font-bold text-gray-900">
            {health?.database.accelerateQueryTime || "0ms"}
          </p>
          <p className="text-sm text-gray-600">Accelerate</p>
        </div>
      </div>

      {health?.database.performanceGain &&
        health.database.performanceGain !== "N/A" && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Performance Boost
                </span>
              </div>
              <span className="text-lg font-bold text-green-600">
                {health.database.performanceGain}
              </span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              Faster queries with Prisma Accelerate
            </p>
          </div>
        )}

      <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
        <span>
          Last checked:{" "}
          {health ? new Date(health.timestamp).toLocaleTimeString() : "Never"}
        </span>
        <button
          onClick={checkHealth}
          className="text-blue-600 hover:text-blue-800"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
