// src/app/admin-dashboard/components/AdvancedAnalytics.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useDashboard } from "../../contexts/DashboardContext";

export default function AdvancedAnalytics() {
  const { data } = useDashboard();
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [predictiveData, setPredictiveData] = useState({
    nextMonthRevenue: 245000,
    growthTrend: 15.2,
    riskScore: 12,
    opportunityAreas: [
      "Enterprise Subscriptions",
      "International Markets",
      "SaaS Integrations",
    ],
  });

  const metrics = {
    revenue: {
      label: "Revenue",
      data: [
        11200, 11800, 12400, 13200, 14100, 15200, 16400, 17200, 18500, 19200,
        20100, 21200, 22850,
      ],
      predictive: [23500, 24200, 24500, 25100, 25800],
    },
    users: {
      label: "Active Users",
      data: [
        980, 1020, 1050, 1080, 1120, 1150, 1180, 1210, 1248, 1280, 1310, 1340,
        1370,
      ],
      predictive: [1400, 1430, 1460, 1490, 1520],
    },
    subscriptions: {
      label: "Subscriptions",
      data: [680, 700, 720, 740, 756, 770, 785, 800, 815, 830, 845, 860, 875],
      predictive: [890, 905, 920, 935, 950],
    },
  };

  const kpis = [
    {
      name: "Customer Lifetime Value",
      value: "R8,450",
      change: "+12%",
      trend: "up",
    },
    { name: "Churn Rate", value: "2.3%", change: "-0.4%", trend: "down" },
    { name: "ARPU", value: "R183", change: "+8%", trend: "up" },
    { name: "Conversion Rate", value: "4.7%", change: "+1.2%", trend: "up" },
  ];

  return (
    <>
      <style>{`
        .advanced-analytics {
          padding: 30px;
          background-color: #ffffff;
          color: #000000;
          min-height: 100vh;
        }
        .analytics-header {
          margin-bottom: 30px;
        }
        .analytics-title {
          font-size: 2rem;
          font-weight: 800;
          color: #000000;
          margin-bottom: 8px;
        }
        .analytics-subtitle {
          color: #6b7280;
          font-weight: 500;
        }
        .controls-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          gap: 20px;
          flex-wrap: wrap;
        }
        .metric-selector {
          display: flex;
          background: #f8fafc;
          border-radius: 8px;
          padding: 4px;
          border: 1px solid #e2e8f0;
        }
        .metric-btn {
          padding: 8px 16px;
          border: none;
          background: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.3s;
          white-space: nowrap;
        }
        .metric-btn.active {
          background: #ffffff;
          color: #000000;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        .kpi-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 20px;
          border: 2px solid #e2e8f0;
          text-align: center;
        }
        .kpi-name {
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .kpi-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: #000000;
          margin-bottom: 4px;
        }
        .kpi-change {
          font-size: 0.9rem;
          font-weight: 600;
        }
        .change-up {
          color: #059669;
        }
        .change-down {
          color: #dc2626;
        }
        .analytics-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
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
        .chart-container {
          height: 300px;
          display: flex;
          align-items: end;
          gap: 8px;
          padding: 20px 0;
          position: relative;
        }
        .chart-bar {
          flex: 1;
          background: #2563eb;
          border-radius: 4px 4px 0 0;
          min-height: 4px;
          position: relative;
          transition: all 0.3s;
        }
        .chart-bar.predictive {
          background: #93c5fd;
          opacity: 0.7;
        }
        .chart-bar:hover {
          opacity: 0.8;
        }
        .prediction-line {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          border-top: 2px dashed #dc2626;
          z-index: 2;
        }
        .prediction-label {
          position: absolute;
          top: 45%;
          right: 0;
          background: #dc2626;
          color: #ffffff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .insights-grid {
          display: grid;
          gap: 16px;
        }
        .insight-card {
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        .insight-card.warning {
          background: #fef3f2;
          border-color: #fecaca;
        }
        .insight-card.success {
          background: #f0f9ff;
          border-color: #bae6fd;
        }
        .insight-card.info {
          background: #f8fafc;
          border-color: #e2e8f0;
        }
        .insight-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .insight-title {
          font-weight: 600;
          color: #000000;
        }
        .insight-desc {
          color: #6b7280;
          font-size: 0.9rem;
        }
        .predictive-card {
          background: linear-gradient(135deg, #1e40af, #3730a3);
          color: #ffffff;
          border: none;
        }
        .predictive-value {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .predictive-label {
          opacity: 0.9;
          margin-bottom: 16px;
        }
        .risk-meter {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          margin: 16px 0;
          overflow: hidden;
        }
        .risk-fill {
          height: 100%;
          background: #059669;
          border-radius: 4px;
          width: 12%;
        }
        .risk-fill.medium {
          background: #d97706;
          width: 45%;
        }
        .risk-fill.high {
          background: #dc2626;
          width: 80%;
        }
      `}</style>

      <div className="advanced-analytics">
        <div className="analytics-header">
          <h1 className="analytics-title">Advanced Analytics</h1>
          <p className="analytics-subtitle">
            Predictive insights and business intelligence
          </p>
        </div>

        <div className="controls-row">
          <div className="metric-selector">
            {Object.keys(metrics).map((metric) => (
              <button
                key={metric}
                className={`metric-btn ${
                  selectedMetric === metric ? "active" : ""
                }`}
                onClick={() => setSelectedMetric(metric)}
              >
                {metrics[metric as keyof typeof metrics].label}
              </button>
            ))}
          </div>
          <div className="metric-selector">
            {["7d", "30d", "90d", "1y"].map((range) => (
              <button
                key={range}
                className={`metric-btn ${timeRange === range ? "active" : ""}`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="kpi-grid">
          {kpis.map((kpi, index) => (
            <div key={index} className="kpi-card">
              <div className="kpi-name">{kpi.name}</div>
              <div className="kpi-value">{kpi.value}</div>
              <div
                className={`kpi-change ${
                  kpi.trend === "up" ? "change-up" : "change-down"
                }`}
              >
                {kpi.change} {kpi.trend === "up" ? "↗" : "↘"}
              </div>
            </div>
          ))}
        </div>

        <div className="analytics-grid">
          <div className="left-column">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Predictive Analytics</h2>
                <div className="metric-selector">
                  {Object.keys(metrics).map((metric) => (
                    <button
                      key={metric}
                      className={`metric-btn ${
                        selectedMetric === metric ? "active" : ""
                      }`}
                      onClick={() => setSelectedMetric(metric)}
                    >
                      {metrics[metric as keyof typeof metrics].label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="chart-container">
                <div className="prediction-line">
                  <div className="prediction-label">Prediction</div>
                </div>
                {metrics[selectedMetric as keyof typeof metrics].data.map(
                  (value, index) => (
                    <div
                      key={index}
                      className="chart-bar"
                      style={{ height: `${(value / 25000) * 100}%` }}
                      data-value={value}
                    ></div>
                  )
                )}
                {metrics[selectedMetric as keyof typeof metrics].predictive.map(
                  (value, index) => (
                    <div
                      key={`pred-${index}`}
                      className="chart-bar predictive"
                      style={{ height: `${(value / 25000) * 100}%` }}
                      data-value={value}
                    ></div>
                  )
                )}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">AI Insights</h2>
              </div>
              <div className="insights-grid">
                <div className="insight-card warning">
                  <div className="insight-header">
                    <i
                      className="fas fa-exclamation-triangle"
                      style={{ color: "#dc2626" }}
                    ></i>
                    <div className="insight-title">Churn Risk Detected</div>
                  </div>
                  <div className="insight-desc">
                    12 enterprise customers showing reduced activity. Proactive
                    engagement recommended.
                  </div>
                </div>
                <div className="insight-card success">
                  <div className="insight-header">
                    <i
                      className="fas fa-rocket"
                      style={{ color: "#059669" }}
                    ></i>
                    <div className="insight-title">Growth Opportunity</div>
                  </div>
                  <div className="insight-desc">
                    SaaS integration feature requests increased by 45%. Consider
                    accelerating development.
                  </div>
                </div>
                <div className="insight-card info">
                  <div className="insight-header">
                    <i
                      className="fas fa-chart-line"
                      style={{ color: "#2563eb" }}
                    ></i>
                    <div className="insight-title">Seasonal Trend</div>
                  </div>
                  <div className="insight-desc">
                    Q4 typically shows 23% higher conversion rates. Plan
                    marketing campaigns accordingly.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="card predictive-card">
              <h2 className="card-title" style={{ color: "#ffffff" }}>
                Revenue Forecast
              </h2>
              <div className="predictive-value">
                R{predictiveData.nextMonthRevenue.toLocaleString()}
              </div>
              <div className="predictive-label">
                Predicted Next Month Revenue
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <i className="fas fa-arrow-up" style={{ color: "#34d399" }}></i>
                <span>{predictiveData.growthTrend}% Growth Trend</span>
              </div>
              <div className="risk-meter">
                <div className="risk-fill"></div>
              </div>
              <div style={{ fontSize: "0.8rem", opacity: "0.8" }}>
                Low Risk Profile
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Opportunity Areas</h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {predictiveData.opportunityAreas.map((area, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px",
                      background: "#f8fafc",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "600",
                        color: "#000000",
                        marginBottom: "4px",
                      }}
                    >
                      {area}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.8rem",
                        color: "#6b7280",
                      }}
                    >
                      <span>High Potential</span>
                      <span>+28% Growth</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Automated Actions</h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <button
                  style={{
                    padding: "12px 16px",
                    background: "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <i className="fas fa-robot"></i> Generate Quarterly Report
                </button>
                <button
                  style={{
                    padding: "12px 16px",
                    background: "#059669",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <i className="fas fa-bullhorn"></i> Launch Targeted Campaign
                </button>
                <button
                  style={{
                    padding: "12px 16px",
                    background: "#7c3aed",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <i className="fas fa-cogs"></i> Optimize Pricing Strategy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
