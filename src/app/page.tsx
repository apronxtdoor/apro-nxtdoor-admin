// src/app/page.tsx (Updated with Icons for "How It Works")
"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <>
      {/* Font Awesome for Icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        integrity="sha512-UhFUPWl2wRYDy6PtSpm0bctOtH7a7Z9mBVkK0mG9VnKxRfYw3a6e7dRa9tzZ9F4a8m45ZcNozJCeJCrYf/DaOg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        }
        .landing-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .nav-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }
        .nav-link:hover {
          color: #ffffff;
        }
        .login-btn {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .login-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }
        .hero {
          text-align: center;
          padding: 6rem 2rem 4rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          letter-spacing: -1.5px;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 3rem;
          opacity: 0.9;
          line-height: 1.6;
          font-weight: 400;
        }
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 4rem;
        }
        .cta-primary {
          background: #ffffff;
          color: #667eea;
          padding: 1rem 2rem;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }
        .cta-secondary {
          background: transparent;
          color: #ffffff;
          padding: 1rem 2rem;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }
        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-3px);
        }

        /* --- Features Section --- */
        .features {
          background: #ffffff;
          color: #000000;
          padding: 5rem 2rem;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 1rem;
          color: #1a202c;
          letter-spacing: -1px;
        }
        .section-subtitle {
          text-align: center;
          color: #718096;
          margin-bottom: 4rem;
          font-size: 1.125rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .feature-card {
          background: #ffffff;
          padding: 2.5rem 2rem;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid #f7fafc;
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.12);
        }
        .feature-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: #ffffff;
          font-size: 2rem;
          box-shadow: 0 6px 20px rgba(102,126,234,0.3);
        }
        .feature-title {
          font-size: 1.375rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #2d3748;
        }
        .feature-desc {
          color: #718096;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        /* Pricing Section */
        .pricing {
          padding: 5rem 2rem;
          background: #f8fafc;
          color: #000000;
        }

        /* Footer */
        .footer {
          background: #1a202c;
          color: #ffffff;
          padding: 4rem 2rem 3rem;
          text-align: center;
        }
        .footer-logo {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #ffffff;
        }
        .footer-links {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }
        .footer-link:hover {
          color: #ffffff;
        }
        .footer-copyright {
          opacity: 0.6;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .navbar { padding: 1rem 1.5rem; }
          .hero-title { font-size: 2.5rem; }
          .features-grid { grid-template-columns: 1fr; }
          .feature-icon { width: 70px; height: 70px; font-size: 1.6rem; }
        }
      `}</style>

      <div className="landing-page">
        {/* Navigation */}
        <nav className="navbar">
          <div className="logo">AProNXTDOOR</div>
          <div className="nav-links">
            <Link href="#features" className="nav-link">
              Features
            </Link>
            <Link href="/pricing" className="nav-link">
              Pricing
            </Link>
            <Link href="/auth/signin" className="login-btn">
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <h1 className="hero-title">
            Trusted Services,
            <br />
            Right Next Door
          </h1>
          <p className="hero-subtitle">
            Connect with verified professionals in your neighborhood. From home
            services to expert consultations, find the perfect match with
            transparent ratings and reviews.
          </p>
          <div className="cta-buttons">
            <Link href="/auth/signin?intent=USER" className="cta-primary">
              Find Services
            </Link>
            <Link href="/auth/signin?intent=VENDOR" className="cta-secondary">
              Become a Pro
            </Link>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="features" className="features">
          <div className="container">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Quickly find, book, and review trusted local professionals in
              three simple steps.
            </p>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fa-solid fa-magnifying-glass" />
                </div>
                <h3 className="feature-title">Search & Compare</h3>
                <p className="feature-desc">
                  Find local professionals by service type, ratings, and
                  pricing. Compare multiple options with detailed profiles and
                  verified reviews.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fa-solid fa-calendar-check" />
                </div>
                <h3 className="feature-title">Book & Connect</h3>
                <p className="feature-desc">
                  Schedule services instantly and communicate directly with
                  professionals. Real-time availability and secure messaging.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fa-solid fa-star" />
                </div>
                <h3 className="feature-title">Rate & Review</h3>
                <p className="feature-desc">
                  Share your experience to build a community of trusted
                  professionals. Transparent ratings help everyone make better
                  choices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-logo">AProNXTDOOR</div>
            <p
              style={{
                marginBottom: "2rem",
                opacity: "0.8",
                maxWidth: "500px",
                margin: "0 auto 2rem",
              }}
            >
              Connecting communities through trusted, local services.
            </p>
            <div className="footer-links">
              <Link href="/terms" className="footer-link">
                Terms of Service
              </Link>
              <Link href="/privacy" className="footer-link">
                Privacy Policy
              </Link>
              <Link
                href="mailto:support@apronxtdoor.com"
                className="footer-link"
              >
                Contact Us
              </Link>
              <Link href="#" className="footer-link">
                About
              </Link>
              <Link href="#" className="footer-link">
                Blog
              </Link>
            </div>

            <p className="footer-copyright">
              © 2024 AProNXTDOOR. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
