// src/app/admin-dashboard/components/VendorDashboard.tsx
"use client";
import React, { useState } from "react";

export default function VendorDashboard() {
  const [vendorProducts, setVendorProducts] = useState([
    {
      id: 1,
      name: "Premium Construction Kit",
      price: "R1,299",
      stock: 45,
      sales: 128,
    },
    {
      id: 2,
      name: "Design Template Pack",
      price: "R499",
      stock: 89,
      sales: 256,
    },
    { id: 3, name: "Developer Toolkit", price: "R799", stock: 23, sales: 87 },
  ]);

  const [vendorOrders, setVendorOrders] = useState([
    {
      id: 1,
      customer: "Quality Builders Inc.",
      product: "Premium Construction Kit",
      amount: "R1,299",
      status: "completed",
    },
    {
      id: 2,
      customer: "Design Studio Co.",
      product: "Design Template Pack",
      amount: "R499",
      status: "pending",
    },
    {
      id: 3,
      customer: "Tech Solutions Ltd.",
      product: "Developer Toolkit",
      amount: "R799",
      status: "shipped",
    },
  ]);

  return (
    <>
      <style>{`
        .vendor-dashboard {
          padding: 30px;
          background-color: #ffffff;
          color: #000000;
          min-height: 100vh;
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
        .product-item, .order-item {
          padding: 16px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .product-item:last-child, .order-item:last-child {
          border-bottom: none;
        }
        .product-header, .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .product-name, .order-customer {
          font-weight: 700;
          color: #000000;
        }
        .product-price, .order-amount {
          font-weight: 600;
          color: #059669;
        }
        .product-details, .order-details {
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
        .status-completed {
          background-color: rgba(16, 185, 129, 0.1);
          color: #059669;
        }
        .status-pending {
          background-color: rgba(245, 158, 11, 0.1);
          color: #d97706;
        }
        .status-shipped {
          background-color: rgba(59, 130, 246, 0.1);
          color: #2563eb;
        }
        .low-stock {
          color: #dc2626;
          font-weight: 600;
        }
      `}</style>

      <div className="vendor-dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Vendor Dashboard</h1>
          <p className="welcome-message">
            Manage your products and track your sales performance.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <div className="stat-value">R45,280</div>
            <div className="stat-change">+12% from last month</div>
          </div>
          <div className="stat-card">
            <h3>Active Products</h3>
            <div className="stat-value">8</div>
            <div className="stat-change">3 featured</div>
          </div>
          <div className="stat-card">
            <h3>Pending Orders</h3>
            <div className="stat-value">12</div>
            <div className="stat-change">5 require attention</div>
          </div>
          <div className="stat-card">
            <h3>Customer Rating</h3>
            <div className="stat-value">4.8/5</div>
            <div className="stat-change">Based on 247 reviews</div>
          </div>
        </div>

        <div className="content-grid">
          <div className="left-column">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Top Products</h2>
                <button className="btn">Add Product</button>
              </div>
              {vendorProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-header">
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">{product.price}</div>
                  </div>
                  <div className="product-details">
                    <span>Stock: {product.stock}</span>
                    <span>Sales: {product.sales}</span>
                  </div>
                  {product.stock < 25 && (
                    <div
                      className="low-stock"
                      style={{ marginTop: "8px", fontSize: "0.8rem" }}
                    >
                      <i className="fas fa-exclamation-triangle"></i> Low stock
                      alert
                    </div>
                  )}
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
                  <i className="fas fa-box"></i> Manage Inventory
                </button>
                <button
                  className="btn"
                  style={{ textAlign: "left", padding: "12px 16px" }}
                >
                  <i className="fas fa-chart-line"></i> View Sales Reports
                </button>
                <button
                  className="btn"
                  style={{ textAlign: "left", padding: "12px 16px" }}
                >
                  <i className="fas fa-cog"></i> Store Settings
                </button>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Recent Orders</h2>
                <button className="btn">View All</button>
              </div>
              {vendorOrders.map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-header">
                    <div className="order-customer">{order.customer}</div>
                    <div className="order-amount">{order.amount}</div>
                  </div>
                  <div className="order-details">
                    <span>{order.product}</span>
                    <span className={`status-badge status-${order.status}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Performance Metrics</h2>
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
                    Conversion Rate
                  </span>
                  <span style={{ fontWeight: "600", color: "#059669" }}>
                    4.2%
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
                      width: "42%",
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
                    Customer Satisfaction
                  </span>
                  <span style={{ fontWeight: "600", color: "#059669" }}>
                    96%
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
                      width: "96%",
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
                    Order Fulfillment
                  </span>
                  <span style={{ fontWeight: "600", color: "#dc2626" }}>
                    88%
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
                      width: "88%",
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
