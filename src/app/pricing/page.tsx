// src/app/pricing/page.tsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="wrap">
      <header className="top">
        <Link href="/" className="brand">
          AProNXTDOOR
        </Link>
        <div className="actions">
          <button className="back" onClick={goBack}>
            ← Go back
          </button>
          <Link href="/auth/signin" className="cta">
            Get Started
          </Link>
        </div>
      </header>

      <main className="container">
        <h1 className="title">Simple, transparent pricing</h1>
        <p className="subtitle">Free for users. Flexible for vendors.</p>

        <div className="grid">
          {/* Users (Free) */}
          <div className="card">
            <div className="badge">Users</div>
            <h2 className="plan">Free</h2>
            <p className="price">
              R0<span>/month</span>
            </p>
            <ul className="features">
              <li>Browse & book local pros</li>
              <li>Ratings & reviews</li>
              <li>Secure messaging</li>
            </ul>
            <Link href="/auth/signin" className="btn">
              Start for free
            </Link>
          </div>

          {/* Vendors — Basic */}
          <div className="card">
            <div className="badge">Vendors</div>
            <h2 className="plan">Basic</h2>
            <p className="price">
              R150<span>/month</span>
            </p>
            <ul className="features">
              <li>Service listings</li>
              <li>Bookings & messaging</li>
              <li>Standard profile</li>
            </ul>
            <Link href="/auth/signin" className="btn">
              Choose Basic
            </Link>
          </div>

          {/* Vendors — Advanced */}
          <div className="card highlight">
            <div className="badge">Vendors</div>
            <h2 className="plan">Advanced</h2>
            <p className="price">
              R299<span>/month</span>
            </p>
            <ul className="features">
              <li>Everything in Basic</li>
              <li>Advanced business analytics</li>
              <li>Priority placement</li>
            </ul>
            <Link href="/auth/signin" className="btn">
              Choose Advanced
            </Link>
          </div>
        </div>

        <p className="note">
          Cancel anytime. Prices include VAT where applicable.
        </p>
      </main>

      <style>{css}</style>
    </div>
  );
}

const css = `
:root { --grad1:#667eea; --grad2:#764ba2; --ink:#0f172a; --muted:#475569; --border:#e2e8f0; }
* { box-sizing:border-box; }
.wrap { background:#fff; color:var(--ink); min-height:100vh; }
.top { position:sticky; top:0; display:flex; justify-content:space-between; align-items:center; padding:14px 20px; background:#fff; border-bottom:1px solid var(--border); }
.brand { font-weight:800; color:#111827; text-decoration:none; letter-spacing:-0.3px; }
.actions { display:flex; gap:10px; }
.back { border:1px solid var(--border); background:#fff; border-radius:10px; padding:8px 12px; cursor:pointer; }
.back:hover { background:#f8fafc; }
.cta { text-decoration:none; border-radius:10px; padding:8px 14px; background:linear-gradient(135deg,var(--grad1),var(--grad2)); color:#fff; }
.container { max-width:1100px; margin:28px auto; padding:0 16px; }
.title { font-size:2rem; font-weight:800; margin-bottom:6px; }
.subtitle { color:var(--muted); margin-bottom:24px; }
.grid { display:grid; gap:16px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); }
.card {
  background:#fff;
  border:2px solid transparent;
  border-radius:16px;
  padding:18px;
  background: linear-gradient(#fff,#fff) padding-box,
             linear-gradient(135deg,var(--grad1),var(--grad2)) border-box;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
}
.card.highlight { transform: translateY(-2px); }
.badge { font-size:12px; color:var(--muted); margin-bottom:2px; }
.plan { font-size:1.2rem; font-weight:800; margin:0; }
.price { font-size:2rem; font-weight:800; margin:6px 0 12px; }
.price span { font-size:0.9rem; color:var(--muted); font-weight:600; margin-left:4px; }
.features { list-style:none; padding:0; margin:0 0 14px; }
.features li { padding:6px 0; color:#1f2937; }
.btn {
  display:inline-block; text-align:center; text-decoration:none; font-weight:700;
  padding:10px 14px; border-radius:10px; color:#fff;
  background: linear-gradient(135deg,var(--grad1),var(--grad2));
}
.btn:hover { filter:brightness(1.05); transform: translateY(-1px); }
.note { color:var(--muted); margin-top:18px; font-size:0.9rem; }
@media (max-width:480px){ .title{font-size:1.6rem;} }
`;
