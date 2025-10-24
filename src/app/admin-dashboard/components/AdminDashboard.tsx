// src/app/admin-dashboard/components/AdminDashboard.tsx
"use client";
import React, { useState } from "react";
import { useDashboard } from "../../contexts/DashboardContext";

export default function AdminDashboard() {
  const { data, isLoading, refreshData } = useDashboard();
  const [revenueData, setRevenueData] = useState(true);
  const [clearNotifications, setClearNotifications] = useState(false);
  const [baseNextStream, setBaseNextStream] = useState(false);
  const [timeRange, setTimeRange] = useState("30d");

  const revenueChartData = {
    "7d": [12500, 13200, 14100, 14800, 15600, 16400, 17200],
    "30d": [
      11200, 11800, 12400, 13200, 14100, 15200, 16400, 17200, 18500, 19200,
      20100, 21200, 22850,
    ],
    "90d": [
      9800, 10200, 11200, 12400, 13200, 14100, 15200, 16400, 17200, 18500,
      19200, 20100,
    ],
  };
  const stats = {
    totalRevenue: "R45,280", // From vendor subscriptions and ads
    activeUsers: "1,248",
    vendorSubscriptions: "156", // Active vendor subscriptions
    adRevenue: "R8,450", // Revenue from advertising
  };

  return (
    <>
      <style>{`
        .admin-dashboard {
          padding: 30px;
          background-color: #ffffff;
          color: #000000;
          min-height: 100vh;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }
        .header-left h1 {
          font-size: 2rem;
          font-weight: 800;
          color: #000000;
          margin-bottom: 8px;
        }
        .header-left p {
          color: #6b7280;
          font-weight: 500;
        }
        .header-controls {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        .time-range-selector {
          display: flex;
          background: #f8fafc;
          border-radius: 8px;
          padding: 4px;
          border: 1px solid #e2e8f0;
        }
        .time-range-btn {
          padding: 8px 16px;
          border: none;
          background: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.3s;
        }
        .time-range-btn.active {
          background: #ffffff;
          color: #000000;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .refresh-btn {
          background: #2563eb;
          color: #ffffff;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.3s;
        }
        .refresh-btn:hover {
          background: #1e40af;
        }
        .refresh-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        .stat-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 24px;
          border: 2px solid #e2e8f0;
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: #2563eb;
        }
        .stat-card h3 {
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 12px;
          font-weight: 600;
        }
        .stat-value {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 8px;
          color: #000000;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .stat-change {
          font-size: 0.9rem;
          color: #059669;
          font-weight: 600;
        }
        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #059669;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }
        .card {
          background: #ffffff;
          border-radius: 12px;
          padding: 24px;
          border: 2px solid #e2e8f0;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 2px solid #e2e8f0;
        }
        .card-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #000000;
        }
        .revenue-chart {
          height: 200px;
          display: flex;
          align-items: end;
          gap: 8px;
          padding: 20px 0;
        }
        .chart-bar {
          flex: 1;
          background: #2563eb;
          border-radius: 4px 4px 0 0;
          min-height: 4px;
          position: relative;
          transition: all 0.3s;
        }
        .chart-bar:hover {
          background: #1e40af;
        }
        .chart-bar::after {
          content: attr(data-value);
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          background: #000000;
          color: #ffffff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .chart-bar:hover::after {
          opacity: 1;
        }
        .system-health {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .health-indicator {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: conic-gradient(#059669 var(--health-percent), #e2e8f0 0deg);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .health-indicator::before {
          content: '';
          position: absolute;
          width: 60px;
          height: 60px;
          background: #ffffff;
          border-radius: 50%;
        }
        .health-value {
          position: relative;
          font-weight: 800;
          font-size: 1.2rem;
          color: #000000;
        }
        .api-status {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .api-metric {
          text-align: center;
          padding: 16px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        .api-metric-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: #000000;
          margin-bottom: 4px;
        }
        .api-metric-label {
          font-size: 0.8rem;
          color: #6b7280;
          font-weight: 600;
        }
        .overview-controls {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
        }
        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #ffffff;
          padding: 12px 18px;
          border-radius: 8px;
          border: 2px solid #e2e8f0;
          color: #000000;
          font-weight: 500;
        }
        .checkbox-container.checked {
          background-color: rgba(37, 99, 235, 0.1);
          border-color: #2563eb;
        }
      `}</style>

      <div className="admin-dashboard">
        <div className="dashboard-header">
          <div className="header-left">
            <h1>Platform Overview</h1>
            <p>Real-time monitoring and analytics</p>
          </div>
          <div className="header-controls">
            <div className="time-range-selector">
              {["7d", "30d", "90d"].map((range) => (
                <button
                  key={range}
                  className={`time-range-btn ${
                    timeRange === range ? "active" : ""
                  }`}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
            <button
              className="refresh-btn"
              onClick={refreshData}
              disabled={isLoading}
            >
              <i
                className={`fas ${
                  isLoading ? "fa-spinner fa-spin" : "fa-sync-alt"
                }`}
              ></i>
              {isLoading ? "Updating..." : "Refresh Data"}
            </button>
          </div>
        </div>

        {/* Overview Controls */}
        <div className="overview-controls">
          <div className={`checkbox-container ${revenueData ? "checked" : ""}`}>
            <input
              type="checkbox"
              id="revenue-data"
              checked={revenueData}
              onChange={() => setRevenueData(!revenueData)}
            />
            <label htmlFor="revenue-data">Revenue Data</label>
          </div>
          <div
            className={`checkbox-container ${
              clearNotifications ? "checked" : ""
            }`}
          >
            <input
              type="checkbox"
              id="clear-notifications"
              checked={clearNotifications}
              onChange={() => setClearNotifications(!clearNotifications)}
            />
            <label htmlFor="clear-notifications">Clear Notifications</label>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <div className="stat-value">
              R{data.totalRevenue.toLocaleString()}
              <div className="pulse-dot"></div>
            </div>
            <div className="stat-change">+12.5% from last month</div>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <div className="stat-value">
              {data.activeUsers.toLocaleString()}
              <div className="pulse-dot"></div>
            </div>
            <div className="stat-change">+84 from last week</div>
          </div>
          <div className="stat-card">
            <h3>New Subscriptions</h3>
            <div className="stat-value">
              {data.newSubscriptions}
              <div className="pulse-dot"></div>
            </div>
            <div className="stat-change">+5 from yesterday</div>
          </div>
          <div className="stat-card">
            <h3>System Health</h3>
            <div className="stat-value">{data.systemHealth.toFixed(1)}%</div>
            <div className="stat-change">All systems operational</div>
          </div>
        </div>

        <div className="content-grid">
          <div className="left-column">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Revenue Analytics</h2>
                <div className="time-range-selector">
                  {["7d", "30d", "90d"].map((range) => (
                    <button
                      key={range}
                      className={`time-range-btn ${
                        timeRange === range ? "active" : ""
                      }`}
                      onClick={() => setTimeRange(range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              <div className="revenue-chart">
                {revenueChartData[
                  timeRange as keyof typeof revenueChartData
                ]?.map((value, index) => (
                  <div
                    key={index}
                    className="chart-bar"
                    style={{ height: `${(value / 25000) * 100}%` }}
                    data-value={`R${value}`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">System Monitoring</h2>
              </div>
              <div className="system-health">
                <div
                  className="health-indicator"
                  style={
                    {
                      "--health-percent": `${data.systemHealth}%`,
                    } as React.CSSProperties
                  }
                >
                  <span className="health-value">
                    {data.systemHealth.toFixed(1)}%
                  </span>
                </div>
                <div>
                  <h3 style={{ color: "#000000", marginBottom: "8px" }}>
                    System Status
                  </h3>
                  <p style={{ color: "#6b7280", marginBottom: "8px" }}>
                    All services running normally
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      className="pulse-dot"
                      style={{ background: "#059669" }}
                    ></div>
                    <span style={{ color: "#059669", fontWeight: "600" }}>
                      Optimal Performance
                    </span>
                  </div>
                </div>
              </div>
              <div className="api-status">
                <div className="api-metric">
                  <div className="api-metric-value">
                    {data.apiPerformance.responseTime}ms
                  </div>
                  <div className="api-metric-label">Response Time</div>
                </div>
                <div className="api-metric">
                  <div className="api-metric-value">
                    {data.apiPerformance.successRate}%
                  </div>
                  <div className="api-metric-label">Success Rate</div>
                </div>
                <div className="api-metric">
                  <div className="api-metric-value">
                    {data.apiPerformance.uptime}%
                  </div>
                  <div className="api-metric-label">Uptime</div>
                </div>
                <div className="api-metric">
                  <div className="api-metric-value">247</div>
                  <div className="api-metric-label">Active Sessions</div>
                </div>
              </div>
            </div>

            {/* Test Reactions Event Card */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Test Reactions Event</h2>
                <button className="refresh-btn">Simulate View Used</button>
              </div>
              <h3
                style={{
                  color: "#000000",
                  marginBottom: "16px",
                  fontWeight: "600",
                }}
              >
                Simulate Version Update
              </h3>
              <div
                style={{
                  height: "8px",
                  backgroundColor: "#e2e8f0",
                  borderRadius: "4px",
                  margin: "16px 0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "#2563eb",
                    width: "65%",
                    borderRadius: "4px",
                  }}
                ></div>
              </div>
              <div
                className={`checkbox-container ${
                  baseNextStream ? "checked" : ""
                }`}
              >
                <input
                  type="checkbox"
                  id="base-nextstream"
                  checked={baseNextStream}
                  onChange={() => setBaseNextStream(!baseNextStream)}
                />
                <label htmlFor="base-nextstream">
                  Base NextStream{" "}
                  <span style={{ color: "#dc2626", fontWeight: "700" }}>
                    [Release Due]
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Recent Subscriptions</h2>
              </div>
              <div
                style={{
                  marginBottom: "16px",
                  padding: "16px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontWeight: "700",
                    color: "#000000",
                    marginBottom: "4px",
                  }}
                >
                  Quality Builders Inc.
                </div>
                <div
                  style={{
                    color: "#6b7280",
                    fontSize: "0.9rem",
                    marginBottom: "8px",
                  }}
                >
                  Quality Card
                </div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    color: "#059669",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                  }}
                >
                  Active
                </div>
              </div>
              <div
                style={{
                  padding: "16px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontWeight: "700",
                    color: "#000000",
                    marginBottom: "4px",
                  }}
                >
                  Premium Services LLC
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 6px",
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      color: "#dc2626",
                      borderRadius: "4px",
                      fontSize: "0.7rem",
                      fontWeight: "600",
                      marginRight: "8px",
                    }}
                  >
                    Popular
                  </span>
                </div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    color: "#059669",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                  }}
                >
                  Active
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Recent Vendors</h2>
              </div>
              <div
                style={{
                  marginBottom: "16px",
                  padding: "16px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontWeight: "700",
                    color: "#000000",
                    marginBottom: "4px",
                  }}
                >
                  Quality Builders Inc.
                </div>
                <div
                  style={{
                    color: "#6b7280",
                    fontSize: "0.9rem",
                    marginBottom: "8px",
                  }}
                >
                  (12) (120)
                </div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    color: "#059669",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                  }}
                >
                  Active
                </div>
              </div>
              <div
                style={{
                  padding: "16px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontWeight: "700",
                    color: "#000000",
                    marginBottom: "4px",
                  }}
                >
                  Premium Services LLC
                </div>
                <div
                  style={{
                    color: "#6b7280",
                    fontSize: "0.9rem",
                    marginBottom: "8px",
                  }}
                >
                  Private
                </div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    color: "#059669",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                  }}
                >
                  Active
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Quick Actions</h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <button
                  className="refresh-btn"
                  style={{ textAlign: "left", justifyContent: "flex-start" }}
                >
                  <i className="fas fa-plus"></i> Add New Subscription
                </button>
                <button
                  className="refresh-btn"
                  style={{
                    textAlign: "left",
                    justifyContent: "flex-start",
                    background: "#059669",
                  }}
                >
                  <i className="fas fa-chart-bar"></i> Generate Report
                </button>
                <button
                  className="refresh-btn"
                  style={{
                    textAlign: "left",
                    justifyContent: "flex-start",
                    background: "#7c3aed",
                  }}
                >
                  <i className="fas fa-cog"></i> System Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
