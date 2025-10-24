// src/app/privacy/page.tsx
"use client";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="wrap">
      <header className="top">
        <Link href="/" className="brand">
          AProNXTDOOR
        </Link>
        <Link href="/" className="back">
          ← Back home
        </Link>
      </header>

      <main className="container">
        <h1>Privacy Policy</h1>
        <p className="muted">Last updated: Oct 20, 2025</p>

        <section>
          <h2>1. Information We Collect</h2>
          <ul>
            <li>Account data (name, email, profile)</li>
            <li>Usage data (pages visited, clicks, device info)</li>
            <li>Vendor business data (listings, pricing, performance)</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Information</h2>
          <p>
            To provide and improve the service, enable bookings, facilitate
            payments, and ensure trust & safety.
          </p>
        </section>

        <section>
          <h2>3. Sharing</h2>
          <p>
            We share with service providers (e.g., hosting, payments) under
            strict contracts. We don’t sell personal data.
          </p>
        </section>

        <section>
          <h2>4. Cookies</h2>
          <p>
            We use cookies for authentication, security, and analytics. You can
            control cookies in your browser.
          </p>
        </section>

        <section>
          <h2>5. Data Rights</h2>
          <p>
            Depending on your region, you may access, correct, or delete your
            data. Contact us for requests.
          </p>
        </section>

        <section>
          <h2>6. Security</h2>
          <p>
            We implement reasonable safeguards, but no system is 100% secure.
          </p>
        </section>

        <section>
          <h2>7. Retention</h2>
          <p>
            We keep data as long as needed for the purposes above or as required
            by law.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>privacy@apronxtdoor.com</p>
        </section>
      </main>

      <style>{styles}</style>
    </div>
  );
}

const styles = `
:root{ --grad1:#667eea; --grad2:#764ba2; --ink:#0f172a; --muted:#475569; --border:#e2e8f0; }
.wrap{ background:#fff; min-height:100vh; }
.top{ position:sticky; top:0; display:flex; justify-content:space-between; align-items:center; padding:14px 22px; background:#fff; border-bottom:1px solid var(--border); }
.brand{ font-weight:800; color:#111827; text-decoration:none; }
.back{ color:#111827; text-decoration:none; border:1px solid var(--border); padding:8px 12px; border-radius:10px; }
.back:hover{ background:#f8fafc; }
.container{ max-width:850px; margin:32px auto; padding:0 16px; color:var(--ink); }
h1{ font-size:2rem; font-weight:800; margin-bottom:4px; }
.muted{ color:var(--muted); margin-bottom:18px; }
h2{ margin-top:22px; margin-bottom:8px; font-size:1.15rem; }
section{ background:#fff; border:2px solid transparent; border-radius:14px; padding:16px; margin-bottom:14px;
  background: linear-gradient(#fff,#fff) padding-box, linear-gradient(135deg,var(--grad1),var(--grad2)) border-box; }
ul{ padding-left:18px; }
`;
