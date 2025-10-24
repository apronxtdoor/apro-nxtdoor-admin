// app/components/UserDashboard.tsx
"use client";
import React, { useState } from "react";

export default function UserDashboard() {
  const [userSubscriptions, setUserSubscriptions] = useState([
    {
      id: 1,
      name: "Premium Plan",
      status: "active",
      nextBilling: "2025-11-03",
      price: "R499",
    },
    {
      id: 2,
      name: "Storage Add-on",
      status: "active",
      nextBilling: "2025-11-03",
      price: "R99",
    },
  ]);

  const [userActivity, setUserActivity] = useState([
    {
      id: 1,
      action: "Project Created",
      project: "Website Redesign",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "File Uploaded",
      project: "Marketing Assets",
      time: "5 hours ago",
    },
    {
      id: 3,
      action: "Team Member Added",
      project: "Development Team",
      time: "1 day ago",
    },
  ]);

  return (
    <>
      <style>{`
        .user-dashboard {
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
        .welcome-message {
          color: #4b5563;
          font-weight: 500;
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
          padding: 20px;
          border: 2px solid #e2e8f0;
        }
        .stat-card h3 {
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 10px;
          font-weight: 600;
        }
        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 5px;
          color: #000000;
        }
        .stat-change {
          font-size: 0.9rem;
          color: #059669;
          font-weight: 600;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        .card {
          background-color: #ffffff;
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
        .btn {
          background-color: #2563eb;
          color: #ffffff;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s;
        }
        .btn:hover {
          background-color: #1e40af;
        }
        .subscription-item {
          padding: 16px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .subscription-item:last-child {
          border-bottom: none;
        }
        .subscription-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .subscription-name {
          font-weight: 700;
          color: #000000;
        }
        .subscription-price {
          font-weight: 600;
          color: #059669;
        }
        .subscription-details {
          display: flex;
          justify-content: space-between;
          color: #6b7280;
          font-size: 0.9rem;
        }
        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .status-active {
          background-color: rgba(16, 185, 129, 0.1);
          color: #059669;
        }
        .activity-item {
          padding: 12px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .activity-item:last-child {
          border-bottom: none;
        }
        .activity-action {
          font-weight: 600;
          color: #000000;
          margin-bottom: 4px;
        }
        .activity-project {
          color: #6b7280;
          font-size: 0.9rem;
        }
        .activity-time {
          color: #9ca3af;
          font-size: 0.8rem;
          margin-top: 4px;
        }
      `}</style>

      <div className="user-dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">User Dashboard</h1>
          <p className="welcome-message">
            Welcome back, John! Here's your activity overview.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Active Projects</h3>
            <div className="stat-value">12</div>
            <div className="stat-change">+2 from last week</div>
          </div>
          <div className="stat-card">
            <h3>Storage Used</h3>
            <div className="stat-value">45%</div>
            <div className="stat-change">8.2 GB of 18 GB</div>
          </div>
          <div className="stat-card">
            <h3>Team Members</h3>
            <div className="stat-value">8</div>
            <div className="stat-change">+1 recently</div>
          </div>
          <div className="stat-card">
            <h3>Monthly Cost</h3>
            <div className="stat-value">R598</div>
            <div className="stat-change">Next bill: Nov 3</div>
          </div>
        </div>

        <div className="content-grid">
          <div className="left-column">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">My Subscriptions</h2>
                <button className="btn">Manage</button>
              </div>
              {userSubscriptions.map((subscription) => (
                <div key={subscription.id} className="subscription-item">
                  <div className="subscription-header">
                    <div className="subscription-name">{subscription.name}</div>
                    <div className="subscription-price">
                      {subscription.price}/month
                    </div>
                  </div>
                  <div className="subscription-details">
                    <span
                      className={`status-badge status-${subscription.status}`}
                    >
                      {subscription.status}
                    </span>
                    <span>Next billing: {subscription.nextBilling}</span>
                  </div>
                </div>
              ))}
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
                  className="btn"
                  style={{ textAlign: "left", padding: "12px 16px" }}
                >
                  <i className="fas fa-plus"></i> Create New Project
                </button>
                <button
                  className="btn"
                  style={{ textAlign: "left", padding: "12px 16px" }}
                >
                  <i className="fas fa-users"></i> Invite Team Members
                </button>
                <button
                  className="btn"
                  style={{ textAlign: "left", padding: "12px 16px" }}
                >
                  <i className="fas fa-chart-bar"></i> View Analytics
                </button>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Recent Activity</h2>
                <button className="btn">View All</button>
              </div>
              {userActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-action">{activity.action}</div>
                  <div className="activity-project">{activity.project}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Project Overview</h2>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: "#000000", fontWeight: "500" }}>
                    Website Redesign
                  </span>
                  <span style={{ fontWeight: "600", color: "#059669" }}>
                    85%
                  </span>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "#e2e8f0",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      backgroundColor: "#2563eb",
                      width: "85%",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: "#000000", fontWeight: "500" }}>
                    Mobile App
                  </span>
                  <span style={{ fontWeight: "600", color: "#059669" }}>
                    60%
                  </span>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "#e2e8f0",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      backgroundColor: "#2563eb",
                      width: "60%",
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: "#000000", fontWeight: "500" }}>
                    API Integration
                  </span>
                  <span style={{ fontWeight: "600", color: "#dc2626" }}>
                    30%
                  </span>
                </div>
                <div
                  style={{
                    height: "8px",
                    backgroundColor: "#e2e8f0",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      backgroundColor: "#2563eb",
                      width: "30%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
