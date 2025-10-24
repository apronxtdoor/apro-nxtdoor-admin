// src/app/vendor-dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function VendorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Tabs & UI state
  const [activeTab, setActiveTab] = useState<"services" | "ai" | "payments">(
    "services"
  );
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [services] = useState([
    {
      id: 1,
      name: "Home Renovation",
      price: "R85/hr",
      status: "active",
      bookings: 12,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Kitchen Remodeling",
      price: "R120/hr",
      status: "active",
      bookings: 8,
      rating: 4.9,
    },
  ]);

  // ---- Guard: must be signed in as VENDOR ----
  useEffect(() => {
    if (status === "loading") return;
    // Not signed in → go to vendor intent sign-in
    if (!session) {
      router.replace("/auth/signin?intent=VENDOR");
      return;
    }
    // Signed in but not a vendor yet → finish onboarding
    const role = (session.user as any)?.role;
    if (role !== "VENDOR") {
      router.replace("/auth/select-role");
    }
  }, [status, session, router]);

  // Geolocation + mock AI tips
  useEffect(() => {
    if (!navigator?.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setAiRecommendations([
          "Increase visibility in your local area with targeted ads",
          "Consider offering emergency repair services - high demand in your region",
          "Optimize your service descriptions for better search ranking",
          "Based on location data, consider extending service radius by 5km",
        ]);
      },
      (err) => console.log("Location access denied:", err)
    );
  }, []);

  // Show a small loader while the guard decides where to send the user
  if (
    status === "loading" ||
    !session ||
    (session.user as any)?.role !== "VENDOR"
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Safe to render dashboard
  const displayName = session.user?.name ?? "Vendor";
  const email = session.user?.email ?? "";
  const stats = {
    totalEarnings: "R8,450",
    completedJobs: 24,
    averageRating: 4.8,
    responseRate: "98%",
  };

  return (
    <div className="vendor-dashboard">
      <style>{`
        .vendor-dashboard { min-height: 100vh; background-color: #f8fafc; color: #000000; }
        .dashboard-header { background: #ffffff; border-bottom: 2px solid #e2e8f0; padding: 20px 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .logo { font-size: 1.5rem; font-weight: 800; color: #2563eb; }
        .vendor-menu { display: flex; align-items: center; gap: 20px; }
        .vendor-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #2563eb, #1e40af); display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: bold; }
        .user-info { display: flex; flex-direction: column; align-items: flex-end; }
        .user-name { font-weight: 600; font-size: 0.9rem; }
        .user-email { font-size: 0.8rem; color: #64748b; }
        .sign-out-btn { background: #ef4444; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; margin-left: 10px; }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #e2e8f0; text-align: center; transition: transform 0.2s, box-shadow 0.2s; position: relative; overflow: hidden; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
        .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #2563eb, #3b82f6); }
        .stat-value { font-size: 2rem; font-weight: 800; color: #000000; margin-bottom: 8px; }
        .stat-label { color: #6b7280; font-weight: 600; }

        .tab-navigation { display: flex; background: #ffffff; border-bottom: 2px solid #e2e8f0; margin-bottom: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .tab-button { position: relative; padding: 16px 24px; background: none; border: none; color: #6b7280; font-weight: 600; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; display: flex; align-items: center; gap: 8px; }
        .tab-button:hover { color: #2563eb; background-color: #f8fafc; }
        .tab-button.active { color: #2563eb; border-bottom-color: #2563eb; background-color: #f8fafc; }

        .dashboard-content { padding: 0 30px 30px; }
        .card { background: #ffffff; border-radius: 12px; padding: 24px; border: 2px solid #e2e8f0; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); transition: transform 0.2s; }
        .card:hover { transform: translateY(-1px); }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 2px solid #e2e8f0; }
        .card-title { font-size: 1.3rem; font-weight: 700; color: #000000; }

        .btn { background: #2563eb; color: #ffffff; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.3s; display: flex; align-items: center; gap: 8px; }
        .btn:hover { background: #1e40af; transform: translateY(-1px); }

        .services-list { display: flex; flex-direction: column; gap: 15px; }
        .service-item { display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px; transition: all 0.3s; }
        .service-item:hover { border-color: #2563eb; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1); }
        .item-info { flex: 1; }
        .item-name { font-weight: 600; color: #000000; margin-bottom: 4px; }
        .item-details { color: #6b7280; font-size: 0.9rem; display: flex; gap: 15px; }
        .item-rating { color: #f59e0b; font-weight: 600; }
        .item-status { padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; margin-right: 15px; }
        .status-active { background: rgba(16, 185, 129, 0.1); color: #059669; }
        .item-actions { display: flex; gap: 8px; }
        .action-btn { padding: 6px 12px; border: 1px solid #e2e8f0; background: #ffffff; border-radius: 4px; cursor: pointer; font-size: 0.8rem; font-weight: 600; transition: all 0.2s; }
        .action-btn:hover { border-color: #2563eb; color: #2563eb; }

        .ai-recommendations { background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; }
        .recommendation-list { list-style: none; padding: 0; }
        .recommendation-item { padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 10px; }
        .recommendation-item:last-child { border-bottom: none; }
        .recommendation-icon { color: #fbbf24; }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .dashboard-content { padding: 0 15px 30px; }
          .user-info { display: none; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dashboard-header">
        <div className="header-top">
          <div className="logo">AProNXTDOOR</div>
          <div className="vendor-menu">
            <i
              className="fas fa-bell"
              style={{
                color: "#000000",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            />
            <div className="user-info">
              <div className="user-name">{displayName}</div>
              <div className="user-email">{email}</div>
            </div>
            <div className="vendor-avatar">
              {(displayName?.charAt(0) ?? "V").toUpperCase()}
            </div>
            <button
              className="sign-out-btn"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalEarnings}</div>
            <div className="stat-label">Total Earnings</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.completedJobs}</div>
            <div className="stat-label">Completed Jobs</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.averageRating}/5</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.responseRate}</div>
            <div className="stat-label">Response Rate</div>
          </div>
        </div>
      </div>

      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "services" ? "active" : ""}`}
          onClick={() => setActiveTab("services")}
        >
          <i className="fas fa-tools" /> My Services
        </button>
        <button
          className={`tab-button ${activeTab === "ai" ? "active" : ""}`}
          onClick={() => setActiveTab("ai")}
        >
          <i className="fas fa-robot" /> AI Insights
        </button>
        <button
          className={`tab-button ${activeTab === "payments" ? "active" : ""}`}
          onClick={() => setActiveTab("payments")}
        >
          <i className="fas fa-credit-card" /> Payments
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === "services" && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">My Services</h2>
              <button className="btn">
                <i className="fas fa-plus" /> Add New Service
              </button>
            </div>
            <div className="services-list">
              {services.map((service) => (
                <div key={service.id} className="service-item">
                  <div className="item-info">
                    <div className="item-name">{service.name}</div>
                    <div className="item-details">
                      <span>{service.price}</span>
                      <span>{service.bookings} bookings</span>
                      <span className="item-rating">
                        <i className="fas fa-star" /> {service.rating}
                      </span>
                    </div>
                  </div>
                  <div className="item-actions">
                    <span className={`item-status status-${service.status}`}>
                      {service.status}
                    </span>
                    <button className="action-btn">
                      <i className="fas fa-edit" /> Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "ai" && (
          <>
            <div className="card ai-recommendations">
              <div className="card-header">
                <h2 className="card-title" style={{ color: "#ffffff" }}>
                  <i className="fas fa-robot" /> AI Recommendations
                </h2>
              </div>
              <ul className="recommendation-list">
                {aiRecommendations.map((rec, index) => (
                  <li key={index} className="recommendation-item">
                    <i className="fas fa-lightbulb recommendation-icon" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            {userLocation && (
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Location Services</h2>
                </div>
                <div className="location-info">
                  <p>
                    <strong>Your location:</strong>{" "}
                    {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </p>
                  <p style={{ marginTop: "10px", color: "#059669" }}>
                    <i className="fas fa-map-marker-alt" /> Services optimized
                    for your geographic area
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "payments" && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Payment Gateway</h2>
            </div>
            <div className="payment-section">
              <h3>Connect Payment Method</h3>
              <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
                <button className="btn">
                  <i className="fab fa-cc-stripe" /> Connect Stripe
                </button>
                <button className="btn" style={{ background: "#059669" }}>
                  <i className="fab fa-cc-paypal" /> Connect PayPal
                </button>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  background: "#f3f4f6",
                  borderRadius: "8px",
                }}
              >
                <h4>Payment Policies</h4>
                <p>
                  By connecting your payment method, you agree to our policies.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
