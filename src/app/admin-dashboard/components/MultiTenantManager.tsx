"use client";
import React, { useState } from "react";

export default function MultiTenantManager() {
  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: "Enterprise Corp",
      users: 45,
      plan: "Enterprise",
      status: "active",
      storage: "45GB",
    },
    {
      id: 2,
      name: "Startup Labs",
      users: 12,
      plan: "Business",
      status: "active",
      storage: "15GB",
    },
    {
      id: 3,
      name: "Global Solutions",
      users: 89,
      plan: "Enterprise",
      status: "suspended",
      storage: "78GB",
    },
    {
      id: 4,
      name: "Tech Innovators",
      users: 23,
      plan: "Professional",
      status: "active",
      storage: "25GB",
    },
  ]);

  const [resources, setResources] = useState({
    totalTenants: 47,
    activeTenants: 42,
    totalRevenue: "R124,500",
    averageUsers: 28,
  });

  const toggleTenantStatus = (id: number) => {
    setTenants(
      tenants.map((tenant) =>
        tenant.id === id
          ? {
              ...tenant,
              status: tenant.status === "active" ? "suspended" : "active",
            }
          : tenant
      )
    );
  };

  return (
    <>
      <style>{`
        .multi-tenant-manager {
          padding: 30px;
          background-color: #ffffff;
          color: #000000;
          min-height: 100vh;
        }
        .manager-header {
          margin-bottom: 30px;
        }
        .manager-title {
          font-size: 2rem;
          font-weight: 800;
          color: #000000;
          margin-bottom: 8px;
        }
        .manager-subtitle {
          color: #6b7280;
          font-weight: 500;
        }
        .resources-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        .resource-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 20px;
          border: 2px solid #e2e8f0;
          text-align: center;
        }
        .resource-value {
          font-size: 2rem;
          font-weight: 800;
          color: #000000;
          margin-bottom: 8px;
        }
        .resource-label {
          color: #6b7280;
          font-weight: 600;
        }
        .tenants-grid {
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
        .btn {
          background: #2563eb;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s;
        }
        .btn:hover {
          background: #1e40af;
        }
        .tenant-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          margin-bottom: 12px;
        }
        .tenant-info {
          flex: 1;
        }
        .tenant-name {
          font-weight: 700;
          color: #000000;
          margin-bottom: 4px;
        }
        .tenant-details {
          display: flex;
          gap: 16px;
          color: #6b7280;
          font-size: 0.9rem;
        }
        .tenant-status {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .status-active {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }
        .status-suspended {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }
        .tenant-actions {
          display: flex;
          gap: 8px;
        }
        .action-btn {
          padding: 6px 12px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .action-btn.primary {
          background: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
        }
        .action-btn.danger {
          background: #dc2626;
          color: #ffffff;
          border-color: #dc2626;
        }
        .isolation-config {
          display: grid;
          gap: 16px;
        }
        .config-item {
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }
        .config-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .config-name {
          font-weight: 600;
          color: #000000;
        }
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }
        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #cbd5e1;
          transition: .4s;
          border-radius: 24px;
        }
        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        input:checked + .toggle-slider {
          background-color: #2563eb;
        }
        input:checked + .toggle-slider:before {
          transform: translateX(20px);
        }
      `}</style>

      <div className="multi-tenant-manager">
        <div className="manager-header">
          <h1 className="manager-title">Multi-Tenant Management</h1>
          <p className="manager-subtitle">
            Manage organizations and resource isolation
          </p>
        </div>

        <div className="resources-grid">
          <div className="resource-card">
            <div className="resource-value">{resources.totalTenants}</div>
            <div className="resource-label">Total Tenants</div>
          </div>
          <div className="resource-card">
            <div className="resource-value">{resources.activeTenants}</div>
            <div className="resource-label">Active Tenants</div>
          </div>
          <div className="resource-card">
            <div className="resource-value">{resources.totalRevenue}</div>
            <div className="resource-label">Monthly Revenue</div>
          </div>
          <div className="resource-card">
            <div className="resource-value">{resources.averageUsers}</div>
            <div className="resource-label">Avg Users/Tenant</div>
          </div>
        </div>

        <div className="tenants-grid">
          <div className="left-column">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Tenant Organizations</h2>
                <button className="btn">Add New Tenant</button>
              </div>
              {tenants.map((tenant) => (
                <div key={tenant.id} className="tenant-item">
                  <div className="tenant-info">
                    <div className="tenant-name">{tenant.name}</div>
                    <div className="tenant-details">
                      <span>{tenant.users} users</span>
                      <span>{tenant.plan} plan</span>
                      <span>{tenant.storage} storage</span>
                    </div>
                  </div>
                  <div className="tenant-actions">
                    <span className={`tenant-status status-${tenant.status}`}>
                      {tenant.status}
                    </span>
                    <button
                      className={`action-btn ${
                        tenant.status === "active" ? "danger" : "primary"
                      }`}
                      onClick={() => toggleTenantStatus(tenant.id)}
                    >
                      {tenant.status === "active" ? "Suspend" : "Activate"}
                    </button>
                    <button className="action-btn">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="right-column">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Resource Isolation</h2>
              </div>
              <div className="isolation-config">
                <div className="config-item">
                  <div className="config-header">
                    <div className="config-name">Database Isolation</div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        defaultChecked
                        id="database-isolation"
                        aria-label="Enable Database Isolation"
                        title="Enable Database Isolation"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                    Separate database instances for each tenant
                  </div>
                </div>
                <div className="config-item">
                  <div className="config-header">
                    <div className="config-name">File Storage Isolation</div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                    Isolated file storage per tenant
                  </div>
                </div>
                <div className="config-item">
                  <div className="config-header">
                    <div className="config-name">Network Segmentation</div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        id="network-segmentation"
                        aria-label="Enable Network Segmentation"
                        title="Enable Network Segmentation"
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                    Separate network segments for enhanced security
                  </div>
                </div>
                <div className="config-item">
                  <div className="config-header">
                    <div className="config-name">API Rate Limiting</div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                    Individual API rate limits per tenant
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Billing & Usage</h2>
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
                  style={{ textAlign: "left", justifyContent: "flex-start" }}
                >
                  <i className="fas fa-file-invoice"></i> Generate Bulk Invoices
                </button>
                <button
                  className="btn"
                  style={{
                    textAlign: "left",
                    justifyContent: "flex-start",
                    background: "#059669",
                  }}
                >
                  <i className="fas fa-chart-pie"></i> Usage Analytics
                </button>
                <button
                  className="btn"
                  style={{
                    textAlign: "left",
                    justifyContent: "flex-start",
                    background: "#7c3aed",
                  }}
                >
                  <i className="fas fa-cog"></i> Billing Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
