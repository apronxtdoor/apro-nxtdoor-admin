// src/app/components/TestNavigation.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TestNavigation() {
  const pathname = usePathname();

  if (pathname === "/") return null; // Don't show on landing page

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        background: "white",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
        border: "2px solid #2563eb",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          marginBottom: "5px",
          color: "#2563eb",
        }}
      >
        Quick Navigation:
      </div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Link
          href="/"
          style={{
            padding: "5px 10px",
            background: "#f1f5f9",
            borderRadius: "4px",
            fontSize: "12px",
            textDecoration: "none",
            color: "#000",
          }}
        >
          🏠 Landing
        </Link>
        <Link
          href="/user-dashboard"
          style={{
            padding: "5px 10px",
            background: "#f1f5f9",
            borderRadius: "4px",
            fontSize: "12px",
            textDecoration: "none",
            color: "#000",
          }}
        >
          👤 User
        </Link>
        <Link
          href="/vendor-dashboard"
          style={{
            padding: "5px 10px",
            background: "#f1f5f9",
            borderRadius: "4px",
            fontSize: "12px",
            textDecoration: "none",
            color: "#000",
          }}
        >
          🏪 Vendor
        </Link>
        <Link
          href="/admin-dashboard"
          style={{
            padding: "5px 10px",
            background: "#f1f5f9",
            borderRadius: "4px",
            fontSize: "12px",
            textDecoration: "none",
            color: "#000",
          }}
        >
          ⚙️ Admin
        </Link>
      </div>
    </div>
  );
}
