"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Shield,
  Clock,
  Award,
  Target,
  Zap,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";

interface AnalyticsData {
  summary: {
    totalUsers: number;
    totalVendors: number;
    activeSubscriptions: number;
    pendingSubscriptions: number;
    totalRevenue: number;
  };
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function AdvancedAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const analyticsRes = await fetch("/api/analytics/overview");

      if (analyticsRes.ok) {
        const analytics = await analyticsRes.json();
        setAnalyticsData(analytics);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const KpiCard = ({ icon: Icon, title, value, change, subtitle }: any) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {change && (
            <p
              className={`text-sm mt-1 ${
                change > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {change > 0 ? "+" : ""}
              {change}% from last month
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "overview", name: "Overview", icon: BarChart3 },
            { id: "revenue", name: "Revenue Analytics", icon: DollarSign },
            { id: "vendors", name: "Vendor Insights", icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard
              icon={DollarSign}
              title="Monthly Revenue"
              value={`R${
                analyticsData?.summary.totalRevenue.toLocaleString() || "0"
              }`}
              change={12.5}
            />
            <KpiCard
              icon={Users}
              title="Active Vendors"
              value={analyticsData?.summary.totalVendors || 0}
              change={8.2}
            />
            <KpiCard
              icon={Shield}
              title="Active Subscriptions"
              value={analyticsData?.summary.activeSubscriptions || 0}
              change={15.7}
            />
            <KpiCard
              icon={Star}
              title="Pending Subscriptions"
              value={analyticsData?.summary.pendingSubscriptions || 0}
              change={-2.1}
            />
          </div>

          {/* Simple Stats Display */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Platform Overview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {analyticsData?.summary.totalUsers || 0}
                </p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {analyticsData?.summary.totalVendors || 0}
                </p>
                <p className="text-sm text-gray-600">Total Vendors</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {analyticsData?.summary.activeSubscriptions || 0}
                </p>
                <p className="text-sm text-gray-600">Active Subscriptions</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">
                  R{analyticsData?.summary.totalRevenue.toLocaleString() || "0"}
                </p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="flex justify-end">
        <button
          onClick={fetchAnalyticsData}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <TrendingUp className="w-4 h-4" />
          <span>Refresh Analytics</span>
        </button>
      </div>
    </div>
  );
}
