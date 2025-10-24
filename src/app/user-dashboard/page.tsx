// src/app/user-dashboard/page.tsx (Sleek Design)
"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Cape Town, SA");

  const categories = [
    { icon: "🧹", name: "Cleaning", color: "#10B981" },
    { icon: "🔧", name: "Repairs", color: "#3B82F6" },
    { icon: "🎨", name: "Painting", color: "#8B5CF6" },
    { icon: "🌿", name: "Gardening", color: "#059669" },
    { icon: "💻", name: "IT Support", color: "#DC2626" },
    { icon: "👶", name: "Tutoring", color: "#D97706" },
  ];

  const featuredVendors = [
    {
      id: 1,
      name: "Sparkle Clean Pro",
      category: "Home Cleaning",
      rating: 4.9,
      reviews: 247,
      price: "R65/hr",
      location: "2.1km away",
      image: "🧹",
      featured: true,
      responseTime: "15 min",
    },
    {
      id: 2,
      name: "FixIt Handyman",
      category: "Home Repairs",
      rating: 4.7,
      reviews: 189,
      price: "R85/hr",
      location: "1.5km away",
      image: "🔧",
      featured: false,
      responseTime: "30 min",
    },
    {
      id: 3,
      name: "Green Thumb Landscaping",
      category: "Gardening",
      rating: 4.8,
      reviews: 156,
      price: "R75/hr",
      location: "3.2km away",
      image: "🌿",
      featured: true,
      responseTime: "1 hour",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      vendor: "Sparkle Clean Pro",
      service: "Deep Home Cleaning",
      date: "Today, 2:00 PM",
      status: "confirmed",
      amount: "R450",
    },
    {
      id: 2,
      vendor: "FixIt Handyman",
      service: "Kitchen Cabinet Repair",
      date: "Tomorrow, 10:00 AM",
      status: "upcoming",
      amount: "R320",
    },
  ];

  return (
    <React.Fragment>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }
        .user-dashboard {
          min-height: 100vh;
          background: #f8fafc;
          color: #1a202c;
        }
        .dashboard-header {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 1.5rem 2rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .logo {
          font-size: 1.375rem;
          font-weight: 700;
          color: #667eea;
          letter-spacing: -0.5px;
        }
        .user-menu {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .menu-icon {
          color: #64748b;
          font-size: 1.25rem;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .menu-icon:hover {
          color: #334155;
        }
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .search-section {
          background: #ffffff;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin-bottom: 2rem;
          border: 1px solid #f1f5f9;
        }
        .search-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #1e293b;
        }
        .search-form {
          display: grid;
          grid-template-columns: 2fr 1fr auto;
          gap: 1rem;
          align-items: end;
        }
        .form-group {
          display: flex;
          flex-direction: column;
        }
        .form-label {
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #475569;
          font-size: 0.9rem;
        }
        .form-input {
          padding: 0.875rem 1rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          background: #ffffff;
        }
        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        .search-btn {
          background: #667eea;
          color: #ffffff;
          border: none;
          padding: 0.875rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.95rem;
          white-space: nowrap;
        }
        .search-btn:hover {
          background: #5a6fd8;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .categories-section {
          margin-top: 1.5rem;
        }
        .category-card {
          background: #ffffff;
          padding: 1.5rem 1rem;
          border-radius: 12px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1.5px solid #f1f5f9;
        }
        .category-card:hover {
          transform: translateY(-2px);
          border-color: #667eea;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .category-icon {
          font-size: 1.75rem;
          margin-bottom: 0.75rem;
        }
        .category-icon[data-color] {
          color: attr(data-color color, #10B981);
        }
        .category-name {
          font-weight: 500;
          color: #374151;
          font-size: 0.9rem;
        }
        .tab-navigation {
          display: flex;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 2rem;
          padding: 0 2rem;
        }
        .tab-button {
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          color: #64748b;
          font-weight: 500;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .tab-button.active {
          color: #667eea;
          border-bottom-color: #667eea;
        }
        .dashboard-content {
          padding: 0 2rem 2rem;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .section-title {
          font-size: 1.375rem;
          font-weight: 600;
          color: #1e293b;
        }
        .view-all {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
        }
        .vendors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .vendor-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 1.5rem;
          border: 1.5px solid #f1f5f9;
          transition: all 0.2s ease;
          position: relative;
        }
        .vendor-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          border-color: #e2e8f0;
        }
        .vendor-card.featured:before {
          content: "Featured";
          position: absolute;
          top: -1px;
          left: 1.5rem;
          background: #667eea;
          color: #ffffff;
          padding: 0.25rem 0.75rem;
          border-radius: 0 0 8px 8px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .vendor-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .vendor-avatar {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #ffffff;
          flex-shrink: 0;
        }
        .vendor-info {
          flex: 1;
        }
        .vendor-name {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.25rem;
          font-size: 1.1rem;
        }
        .vendor-category {
          color: #64748b;
          font-size: 0.9rem;
        }
        .vendor-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .stars {
          color: #f59e0b;
          font-size: 0.9rem;
        }
        .rating-text {
          color: #64748b;
          font-size: 0.85rem;
        }
        .vendor-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: #64748b;
          font-size: 0.9rem;
        }
        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }
        .book-btn {
          background: #667eea;
          color: #ffffff;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }
        .book-btn:hover {
          background: #5a6fd8;
          transform: translateY(-1px);
        }
        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .booking-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 1.5rem;
          border: 1.5px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s ease;
        }
        .booking-card:hover {
          border-color: #e2e8f0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .booking-info h4 {
          font-weight: 600;
          margin-bottom: 0.375rem;
          color: #1e293b;
          font-size: 1rem;
        }
        .booking-meta {
          color: #64748b;
          font-size: 0.9rem;
        }
        .booking-status {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .status-confirmed {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }
        .status-upcoming {
          background: rgba(59, 130, 246, 0.1);
          color: #2563eb;
        }
        @media (max-width: 768px) {
          .dashboard-header, .dashboard-content {
            padding: 1rem;
          }
          .search-form {
            grid-template-columns: 1fr;
          }
          .categories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .vendors-grid {
            grid-template-columns: 1fr;
          }
          .tab-navigation {
            padding: 0 1rem;
            overflow-x: auto;
          }
        }
        .popular-categories-title {
          margin-bottom: 1rem;
          color: #374151;
          font-weight: 500;
          font-size: 0.95rem;
        }
      `}</style>

      <div className="user-dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-top">
            <div className="logo">AProNXTDOOR</div>
            <div className="user-menu">
              <i className="fas fa-search menu-icon"></i>
              <i className="far fa-heart menu-icon"></i>
              <i className="far fa-bell menu-icon"></i>
              <div className="user-avatar">JD</div>
            </div>
          </div>

          {/* Search Section */}
          <div className="search-section">
            <h2 className="search-title">Find trusted professionals</h2>
            <div className="search-form">
              <div className="form-group">
                <label className="form-label">What service do you need?</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., home cleaning, plumbing, tutoring..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location"
                  title="Location"
                />
              </div>
            </div>
            <div className="categories-section">
              <h3 className="popular-categories-title">Popular Categories</h3>
              <div className="categories-grid">
                {categories.map((category, index) => (
                  <div key={index} className="category-card">
                    <div className="category-icon" data-color={category.color}>
                      {category.icon}
                    </div>
                    <div className="category-name">{category.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === "discover" ? "active" : ""}`}
            onClick={() => setActiveTab("discover")}
          >
            <i className="fas fa-compass"></i> Discover
          </button>
          <button
            className={`tab-button ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <i className="fas fa-calendar"></i> My Bookings
          </button>
          <button
            className={`tab-button ${
              activeTab === "favorites" ? "active" : ""
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            <i className="fas fa-heart"></i> Favorites
          </button>
          <button
            className={`tab-button ${activeTab === "messages" ? "active" : ""}`}
            onClick={() => setActiveTab("messages")}
          >
            <i className="fas fa-comments"></i> Messages
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {activeTab === "discover" && (
            <>
              <div className="section-header">
                <h3 className="section-title">Featured Professionals</h3>
                <a href="#" className="view-all">
                  View all
                </a>
              </div>
              <div className="vendors-grid">
                {featuredVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className={`vendor-card ${
                      vendor.featured ? "featured" : ""
                    }`}
                  >
                    <div className="vendor-header">
                      <div className="vendor-avatar">{vendor.image}</div>
                      <div className="vendor-info">
                        <div className="vendor-name">{vendor.name}</div>
                        <div className="vendor-category">{vendor.category}</div>
                      </div>
                    </div>
                    <div className="vendor-rating">
                      <div className="stars">
                        {"★".repeat(Math.floor(vendor.rating))}
                        {"☆".repeat(5 - Math.floor(vendor.rating))}
                      </div>
                      <div className="rating-text">
                        {vendor.rating} ({vendor.reviews} reviews)
                      </div>
                    </div>
                    <div className="vendor-details">
                      <div className="detail-item">
                        <i
                          className="fas fa-clock"
                          style={{ color: "#64748b", fontSize: "0.8rem" }}
                        ></i>
                        <span>{vendor.responseTime} response</span>
                      </div>
                      <div className="detail-item">
                        <i
                          className="fas fa-map-marker-alt"
                          style={{ color: "#64748b", fontSize: "0.8rem" }}
                        ></i>
                        <span>{vendor.location}</span>
                      </div>
                      <div className="detail-item">
                        <i
                          className="fas fa-tag"
                          style={{ color: "#64748b", fontSize: "0.8rem" }}
                        ></i>
                        <span>{vendor.price}</span>
                      </div>
                    </div>
                    <button className="book-btn">Book Service</button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "bookings" && (
            <>
              <div className="section-header">
                <h3 className="section-title">My Bookings</h3>
              </div>
              <div className="bookings-list">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-info">
                      <h4>{booking.service}</h4>
                      <div className="booking-meta">
                        {booking.vendor} • {booking.date} • {booking.amount}
                      </div>
                    </div>
                    <div className={`booking-status status-${booking.status}`}>
                      {booking.status}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "favorites" && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                color: "#64748b",
                background: "#ffffff",
                borderRadius: "16px",
                border: "1.5px solid #f1f5f9",
              }}
            >
              <i
                className="far fa-heart"
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  color: "#e2e8f0",
                }}
              ></i>
              <h3 style={{ marginBottom: "0.5rem", color: "#374151" }}>
                No favorites yet
              </h3>
              <p>Start exploring professionals and add your favorites here!</p>
            </div>
          )}

          {activeTab === "messages" && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                color: "#64748b",
                background: "#ffffff",
                borderRadius: "16px",
                border: "1.5px solid #f1f5f9",
              }}
            >
              <i
                className="far fa-comments"
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  color: "#e2e8f0",
                }}
              ></i>
              <h3 style={{ marginBottom: "0.5rem", color: "#374151" }}>
                No messages yet
              </h3>
              <p>Your conversations with professionals will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
