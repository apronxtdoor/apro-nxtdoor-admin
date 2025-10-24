// app/components/AdvancedIntegrations.tsx
"use client";
import React, { useState } from "react";

export default function AdvancedIntegrations() {
  const [integrations, setIntegrations] = useState([
    { id: 1, name: "Stripe Payments", connected: true, status: "active" },
    { id: 2, name: "QuickBooks Accounting", connected: true, status: "active" },
    {
      id: 3,
      name: "Mailchimp Marketing",
      connected: false,
      status: "inactive",
    },
    { id: 4, name: "Slack Notifications", connected: true, status: "active" },
    { id: 5, name: "Google Analytics", connected: false, status: "inactive" },
    { id: 6, name: "Zapier Automation", connected: true, status: "active" },
  ]);

  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: "Main API Key",
      key: "sk_live_***kf42",
      lastUsed: "2 hours ago",
    },
    {
      id: 2,
      name: "Webhook Secret",
      key: "whsec_***8dj3",
      lastUsed: "5 minutes ago",
    },
  ]);

  const toggleIntegration = (id: number) => {
    setIntegrations(
      integrations.map((integration) =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

  return (
    <>
      <style>{`
        .integrations-container {
          padding: 30px;
          background-color: #ffffff;
          color: #000000;
        }
        .api-key-actions {
          margin-top: 12px;
          display: flex;
          gap: 8px;
        }
        .api-key-action-btn {
          padding: 6px 12px;
          font-size: 0.8rem;
        }
        .webhook-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          background-color: #f8fafc;
          color: #000000;
          font-family: monospace;
        }
        .webhook-label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #000000;
        }
        .mb-16px {
          margin-bottom: 16px;
        }
        .integrations-header {
          margin-bottom: 30px;
        }
        .integrations-title {
          font-size: 2rem;
          font-weight: 800;
          color: #000000;
          margin-bottom: 10px;
        }
        .integrations-subtitle {
          color: #4b5563;
          font-weight: 500;
        }
        .integrations-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
          margin-bottom: 40px;
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
        .integration-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .integration-item:last-child {
          border-bottom: none;
        }
        .integration-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .integration-icon {
          width: 40px;
          height: 40px;
          background-color: #2563eb;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }
        .integration-name {
          font-weight: 600;
          color: #000000;
        }
        .integration-status {
          font-size: 0.8rem;
          padding: 4px 8px;
          border-radius: 12px;
          font-weight: 600;
        }
        .status-active {
          background-color: rgba(16, 185, 129, 0.1);
          color: #059669;
        }
        .status-inactive {
          background-color: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 50px;
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
          transform: translateX(26px);
        }
        .api-key-item {
          padding: 12px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .api-key-item:last-child {
          border-bottom: none;
        }
        .api-key-name {
          font-weight: 600;
          color: #000000;
          margin-bottom: 4px;
        }
        .api-key-value {
          font-family: monospace;
          background-color: #f8fafc;
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          margin: 8px 0;
          color: #000000;
        }
        .api-key-meta {
          font-size: 0.8rem;
          color: #6b7280;
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
        .btn-secondary {
          background-color: #ffffff;
          color: #000000;
          border: 2px solid #e2e8f0;
        }
        .btn-secondary:hover {
          background-color: #f8fafc;
        }
      `}</style>

      <div className="integrations-container">
        <div className="integrations-header">
          <h1 className="integrations-title">Advanced Integrations</h1>
          <p className="integrations-subtitle">
            Connect your AProNXTDOOR platform with external services and APIs
          </p>
        </div>

        <div className="integrations-grid">
          <div className="left-column">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Connected Services</h2>
              </div>
              {integrations.map((integration) => (
                <div key={integration.id} className="integration-item">
                  <div className="integration-info">
                    <div className="integration-icon">
                      <i className="fas fa-plug"></i>
                    </div>
                    <div>
                      <div className="integration-name">{integration.name}</div>
                      <div
                        className={`integration-status status-${integration.status}`}
                      >
                        {integration.status}
                      </div>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={integration.connected}
                      onChange={() => toggleIntegration(integration.id)}
                      title={`Toggle ${integration.name} integration`}
                      placeholder={`Toggle ${integration.name} integration`}
                      aria-label={`Toggle ${integration.name} integration`}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="right-column">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">API Keys</h2>
              </div>
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="api-key-item">
                  <div className="api-key-name">{apiKey.name}</div>
                  <div className="api-key-value">{apiKey.key}</div>
                  <div className="api-key-meta">
                    Last used: {apiKey.lastUsed}
                  </div>
                  <div className="api-key-actions">
                    <button className="btn-secondary api-key-action-btn">
                      <i className="fas fa-copy"></i> Copy
                    </button>
                    <button className="btn-secondary api-key-action-btn">
                      <i className="fas fa-redo"></i> Regenerate
                    </button>
                    <button className="btn-secondary api-key-action-btn">
                      <i className="fas fa-trash"></i> Revoke
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Integration Analytics</h2>
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
                    API Calls (24h)
                  </span>
                  <span style={{ fontWeight: "600", color: "#000000" }}>
                    1,247
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: "#000000", fontWeight: "500" }}>
                    Success Rate
                  </span>
                  <span style={{ fontWeight: "600", color: "#059669" }}>
                    99.8%
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: "#000000", fontWeight: "500" }}>
                    Average Response Time
                  </span>
                  <span style={{ fontWeight: "600", color: "#000000" }}>
                    142ms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
