// src/app/auth/page.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("user");

  return (
    <>
      <style>{`
        .auth-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .auth-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
        }
        .auth-title {
          font-size: 2rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 10px;
          color: #000000;
        }
        .auth-subtitle {
          text-align: center;
          color: #6b7280;
          margin-bottom: 30px;
        }
        .user-type-selector {
          display: flex;
          background: #f8fafc;
          border-radius: 10px;
          padding: 4px;
          margin-bottom: 20px;
        }
        .user-type-btn {
          flex: 1;
          padding: 10px;
          border: none;
          background: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .user-type-btn.active {
          background: #ffffff;
          color: #667eea;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .form-input {
          padding: 15px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
        .form-input:focus {
          outline: none;
          border-color: #667eea;
        }
        .auth-btn {
          background: #667eea;
          color: #ffffff;
          border: none;
          padding: 15px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-top: 10px;
        }
        .auth-btn:hover {
          background: #5a6fd8;
        }
        .auth-switch {
          text-align: center;
          margin-top: 20px;
          color: #6b7280;
        }
        .switch-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
        }
        .back-home {
          text-align: center;
          margin-top: 20px;
        }
        .back-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-card">
          <h1 className="auth-title">
            {isLogin ? "Welcome Back" : "Join AProNXTDOOR"}
          </h1>
          <p className="auth-subtitle">
            {isLogin ? "Sign in to your account" : "Create your account today"}
          </p>

          <div className="user-type-selector">
            <button
              className={`user-type-btn ${userType === "user" ? "active" : ""}`}
              onClick={() => setUserType("user")}
            >
              👤 User
            </button>
            <button
              className={`user-type-btn ${
                userType === "vendor" ? "active" : ""
              }`}
              onClick={() => setUserType("vendor")}
            >
              🏪 Vendor
            </button>
          </div>

          <form className="auth-form">
            {!isLogin && (
              <input
                type="text"
                className="form-input"
                placeholder="Full Name"
                required
              />
            )}
            <input
              type="email"
              className="form-input"
              placeholder="Email Address"
              required
            />
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              required
            />
            {!isLogin && userType === "vendor" && (
              <div
                style={{
                  background: "#f0f9ff",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "2px solid #bae6fd",
                  textAlign: "center",
                }}
              >
                <i
                  className="fas fa-info-circle"
                  style={{ color: "#0369a1", marginRight: "8px" }}
                ></i>
                Vendor subscription: <strong>R150/month</strong>
              </div>
            )}
            <button type="submit" className="auth-btn">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="auth-switch">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className="switch-link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Sign In"}
            </span>
          </div>

          <div className="back-home">
            <Link href="/" className="back-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
