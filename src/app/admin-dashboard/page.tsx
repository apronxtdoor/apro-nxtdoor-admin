// src/app/admin-dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  // this is set in your NextAuth callbacks
  role?: "ADMIN" | "USER" | "VENDOR";
};

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const me = (session?.user as SessionUser) || {};
  const isAdmin = me.role === "ADMIN";
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("admin");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) =>
          setUserLocation({ lat: p.coords.latitude, lng: p.coords.longitude }),
        () => {}
      );
    }
  }, []);

  // 1) While NextAuth resolves the session
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading…</div>
      </div>
    );
  }

  // 2) Not signed in → show sign-in card
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        {/* Font Awesome for the icons used below */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              AProNXTDOOR Admin
            </h1>
            <p className="text-gray-600 mt-2">
              Sign in to access the admin dashboard
            </p>
          </div>
          <button
            onClick={() =>
              signIn("google", { callbackUrl: "/admin-dashboard" })
            }
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <i className="fa-brands fa-google text-base" />
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  // 3) Signed in but not admin → block with helpful actions
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Not authorized</h2>
          <p className="text-gray-600 mb-6">
            You’re signed in as <strong>{me.email ?? "user"}</strong> but don’t
            have admin access.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              className="px-4 py-2 rounded-md border border-gray-300"
              onClick={() => router.push("/")}
            >
              Go home
            </button>
            <button
              className="px-4 py-2 rounded-md bg-red-500 text-white"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4) Admin view (your existing UI, adapted to use NextAuth user)
  return (
    <div className="dashboard-container">
      {/* Font Awesome for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .dashboard-container { min-height: 100vh; background-color: #f8fafc; color: #000000; }
        .app-header { background: #ffffff; border-bottom: 2px solid #e2e8f0; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .app-title { font-size: 1.5rem; font-weight: 800; color: #000000; }
        .user-menu { display: flex; align-items: center; gap: 16px; }
        .search-container { position: relative; margin-right: 10px; }
        .search-input { padding: 10px 15px 10px 40px; border-radius: 25px; border: 1px solid #e2e8f0; background: #f8fafc; width: 280px; transition: all 0.3s; font-size: 0.9rem; }
        .search-input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); background: white; }
        .search-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #64748b; }
        .notification-icon { position: relative; color: #000000; font-size: 1.2rem; cursor: pointer; }
        .notification-indicator { position: absolute; top: -2px; right: -2px; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; border: 2px solid white; }
        .user-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #2563eb, #1e40af); display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: bold; }
        .user-info { display: flex; flex-direction: column; align-items: flex-end; }
        .user-name { font-weight: 600; font-size: 0.9rem; }
        .user-email { font-size: 0.8rem; color: #64748b; }
        .sign-out-btn { background: #ef4444; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; }
        .sign-out-btn:hover { background: #dc2626; }
        .tab-navigation { display: flex; background: #ffffff; border-bottom: 2px solid #e2e8f0; padding: 0 30px; position: sticky; top: 0; z-index: 100; backdrop-filter: blur(8px); overflow-x: auto; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .tab-button { position: relative; padding: 16px 20px; background: none; border: none; color: #000000; font-weight: 600; cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.3s; display: flex; align-items: center; gap: 8px; white-space: nowrap; flex-shrink: 0; }
        .tab-button:hover { background-color: #f1f5f9; color: #2563eb; transform: translateY(-1px); }
        .tab-button.active { color: #2563eb; border-bottom-color: #2563eb; background-color: #f8fafc; }
        .notification-badge { position: absolute; top: 8px; right: 8px; background: #ef4444; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 0.7rem; display: flex; align-items: center; justify-content: center; }
        .tab-content { padding: 30px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #e2e8f0; text-align: center; transition: transform 0.2s, box-shadow 0.2s; position: relative; overflow: hidden; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
        .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #2563eb, #3b82f6); }
        .stat-value { font-size: 2rem; font-weight: 800; color: #000000; margin-bottom: 8px; }
        .stat-label { color: #6b7280; font-weight: 600; }
        .ai-recommendations { background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 20px; border-radius: 12px; margin-bottom: 20px; }
        .recommendation-list { list-style: none; padding: 0; }
        .recommendation-item { padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 10px; }
        .recommendation-item:last-child { border-bottom: none; }
        .recommendation-icon { color: #fbbf24; }
        .location-services-card { margin-top: 14px; background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; }
        .location-services-area { margin-top: 8px; color: #059669; }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .tab-navigation { padding: 0 15px; }
          .tab-button { padding: 12px 16px; font-size: 0.9rem; }
          .app-header { padding: 15px 20px; }
          .app-title { font-size: 1.3rem; }
        }
        @media (max-width: 640px) { .user-info { display: none; } }
        @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* Header */}
      <div className="app-header">
        <div className="app-title">AProNXTDOOR Enterprise Dashboard</div>
        <div className="user-menu">
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search users, vendors, analytics..."
              className="search-input"
            />
          </div>
          <i className="fas fa-bell notification-icon">
            <span className="notification-indicator"></span>
          </i>
          <div className="user-info">
            <div className="user-name">{me.name || "Admin User"}</div>
            <div className="user-email">{me.email}</div>
          </div>
          <div className="user-avatar">
            {(me.name || me.email || "A").charAt(0).toUpperCase()}
          </div>
          <button
            className="sign-out-btn"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-navigation">
        {[
          { id: "admin", label: "Admin", icon: "fas fa-cog", notifications: 0 },
          { id: "user", label: "User", icon: "fas fa-user", notifications: 3 },
          {
            id: "vendor",
            label: "Vendor",
            icon: "fas fa-store",
            notifications: 5,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={tab.icon}></i>
            {tab.label}
            {tab.notifications > 0 && (
              <span className="notification-badge">{tab.notifications}</span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="tab-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">1,248</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">86</div>
            <div className="stat-label">Active Vendors</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">5,421</div>
            <div className="stat-label">Total Products</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">R24,580</div>
            <div className="stat-label">Platform Revenue</div>
          </div>
        </div>

        <div className="ai-recommendations">
          <h3>
            <i className="fas fa-robot"></i> AI Insights
          </h3>
          <ul className="recommendation-list">
            <li className="recommendation-item">
              <i className="fas fa-lightbulb recommendation-icon"></i>Based on
              user behavior, consider adding more home renovation services
            </li>
            <li className="recommendation-item">
              <i className="fas fa-lightbulb recommendation-icon"></i>Peak
              booking times detected: Weekdays 2–5 PM
            </li>
            <li className="recommendation-item">
              <i className="fas fa-lightbulb recommendation-icon"></i>Users from
              your area prefer weekend appointments
            </li>
          </ul>

          {userLocation && (
            <div className="location-services-card">
              <h3>Location Services Active</h3>
              <p>
                Your location: {userLocation.lat.toFixed(4)},{" "}
                {userLocation.lng.toFixed(4)}
              </p>
              <p className="location-services-area">
                <i className="fas fa-map-marker-alt"></i> Showing relevant
                services for your area
              </p>
            </div>
          )}

          <div className="location-services-card" style={{ marginTop: 14 }}>
            <h3>Authentication</h3>
            <p>
              Welcome, <strong>{me.name || me.email}</strong>. You’re
              authenticated with NextAuth and have <strong>ADMIN</strong>{" "}
              access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
