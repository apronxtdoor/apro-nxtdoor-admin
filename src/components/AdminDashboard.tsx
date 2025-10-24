// app/components/AdminDashboard.tsx
"use client";
import React, { useState } from "react";

export default function AdminDashboard() {
  const [revenueData, setRevenueData] = useState(true);
  const [clearNotifications, setClearNotifications] = useState(false);
  const [baseNextStream, setBaseNextStream] = useState(false);

  return (
    <>
      <style>{`
        .admin-dashboard {
          padding: 30px;
          background-color: #ffffff;
          color: #000000;
        }
        .dashboard-header {
          margin-bottom: 30px;
        }
        .dashboard-title {
          font-size: 2rem;
          font-weight: 800;
          color: #000000;
          margin-bottom: 10px;
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
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        .stat-card {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 24px;
          border: 2px solid #e2e8f0;
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
        }
        .stat-change {
          font-size: 0.9rem;
          color: #059669;
          font-weight: 600;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }
        .card {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 24px;
          border: 2px solid #e2e8f0;
          margin-bottom: 24px;
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
        .btn {
          background-color: #2563eb;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s;
        }
        .btn:hover {
          background-color: #1e40af;
        }
        .subscription-item, .vendor-item {
          padding: 16px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .subscription-item:last-child, .vendor-item:last-child {
          border-bottom: none;
        }
        .item-main {
          font-weight: 700;
          margin-bottom: 6px;
          color: #000000;
          font-size: 1rem;
        }
        .item-details {
          font-size: 0.9rem;
          color: #6b7280;
          font-weight: 500;
        }
        .item-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-top: 8px;
          display: inline-block;
        }
        .status-active {
          background-color: rgba(16, 185, 129, 0.1);
          color: #059669;
          border: 2px solid rgba(16, 185, 129, 0.3);
        }
        .tag {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          margin-left: 10px;
        }
        .tag-popular {
          background-color: rgba(239, 68, 68, 0.1);
          color: #dc2626;
          border: 2px solid rgba(239, 68, 68, 0.3);
        }
        .release-due {
          color: #dc2626;
          font-weight: 700;
        }
        .progress-bar {
          height: 10px;
          background-color: #f8fafc;
          border-radius: 6px;
          margin: 16px 0;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        .progress-fill {
          height: 100%;
          background-color: #2563eb;
          border-radius: 6px;
          width: 65%;
        }
        .section-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin: 20px 0 16px 0;
          color: #000000;
        }
        .section-title:first-child {
          margin-top: 0;
        }
        .quick-actions {
          margin-top: 24px;
        }
        .btn-block {
          width: 100%;
          margin-bottom: 12px;
          text-align: left;
          padding: 14px 18px;
          font-weight: 600;
        }
        .btn-block i {
          margin-right: 10px;
        }
        .btn-secondary {
          background-color: #ffffff;
          color: #000000;
          border: 2px solid #e2e8f0;
        }
        .btn-secondary:hover {
          background-color: #f8fafc;
        }
      `}</style>

      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Platform Overview</h1>
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

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <div className="stat-value">1,248</div>
            <div className="stat-change">R2,248 from last month</div>
          </div>
          <div className="stat-card">
            <h3>Total Numbers</h3>
            <div className="stat-value">856</div>
            <div className="stat-change">R1,524 from last month</div>
          </div>
          <div className="stat-card">
            <h3>Active Subscriptions</h3>
            <div className="stat-value">756</div>
            <div className="stat-change">R3,284 from last month</div>
          </div>
          <div className="stat-card">
            <h3>Monthly Revenue</h3>
            <div className="stat-value">R228,500</div>
            <div className="stat-change">22% from last month</div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          <div className="left-column">
            {/* Test Reactions Event Card */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Test Reactions Event</h2>
                <button className="btn">Simulate View Used</button>
              </div>
              <h3 className="section-title">Simulate Version Update</h3>
              <div className="progress-bar">
                <div className="progress-fill"></div>
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
                  <span className="release-due">[Release Due]</span>
                </label>
              </div>
            </div>

            {/* Recent Subscriptions Card */}
            <div className="card">
              <h2 className="section-title">Recent Subscriptions</h2>
              <div className="subscription-item">
                <div className="item-main">Quality Builders Inc.</div>
                <div className="item-details">Quality Card</div>
                <div className="item-status status-active">Active</div>
              </div>
              <div className="subscription-item">
                <div className="item-main">
                  Premium Services LLC
                  <span className="tag tag-popular">Popular</span>
                </div>
                <div className="item-status status-active">Active</div>
              </div>
            </div>
          </div>

          <div className="right-column">
            {/* Recent Vendors Card */}
            <div className="card">
              <h2 className="section-title">Recent Vendors</h2>
              <div className="vendor-item">
                <div className="item-main">Quality Builders Inc.</div>
                <div className="item-details">(12) (120)</div>
                <div className="item-status status-active">Active</div>
              </div>
              <div className="vendor-item">
                <div className="item-main">Premium Services LLC</div>
                <div className="item-details">Private</div>
                <div className="item-status status-active">Active</div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <h2 className="section-title">Quick Actions</h2>
                <button className="btn btn-block">
                  <i className="fas fa-plus"></i> Add New Subscription
                </button>
                <button className="btn btn-secondary btn-block">
                  <i className="fas fa-chart-bar"></i> Generate Report
                </button>
                <button className="btn btn-secondary btn-block">
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
