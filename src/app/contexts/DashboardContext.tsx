// src/app/contexts/DashboardContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface DashboardData {
  totalRevenue: number;
  activeUsers: number;
  newSubscriptions: number;
  systemHealth: number;
  recentActivities: any[];
  apiPerformance: {
    responseTime: number;
    successRate: number;
    uptime: number;
  };
}

interface DashboardContextType {
  data: DashboardData;
  isLoading: boolean;
  refreshData: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DashboardData>({
    totalRevenue: 228500,
    activeUsers: 1248,
    newSubscriptions: 45,
    systemHealth: 98.7,
    recentActivities: [],
    apiPerformance: {
      responseTime: 142,
      successRate: 99.8,
      uptime: 99.9,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData((prev) => ({
        ...prev,
        totalRevenue: prev.totalRevenue + Math.random() * 1000,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10),
        newSubscriptions: prev.newSubscriptions + Math.floor(Math.random() * 5),
      }));
      setIsLoading(false);
    }, 1000);
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        systemHealth: 98 + Math.random() * 2,
        apiPerformance: {
          ...prev.apiPerformance,
          responseTime: 140 + Math.random() * 20,
        },
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardContext.Provider value={{ data, isLoading, refreshData }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
