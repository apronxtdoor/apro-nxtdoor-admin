// src/app/terms/page.tsx
"use client";
import Link from "next/link";

export default function TermsPage() {
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
        <h1>Terms of Service</h1>
        <p className="muted">Last updated: Oct 20, 2025</p>

        <section>
          <h2>1. Overview</h2>
          <p>
            These Terms of Service (“Terms”) govern your access to and use of
            the AProNXTDOOR platform, including our websites, mobile apps, and
            related services.
          </p>
        </section>

        <section>
          <h2>2. Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and for all activities that occur under your account.
          </p>
        </section>

        <section>
          <h2>3. Vendor Obligations</h2>
          <ul>
            <li>Provide accurate service information and pricing.</li>
            <li>Comply with applicable laws and licensing requirements.</li>
            <li>Deliver services with reasonable care and skill.</li>
          </ul>
        </section>

        <section>
          <h2>4. Payments</h2>
          <p>
            Payment processing may be provided by third-party providers. By
            connecting a payout method, you agree to their terms and our fee
            structure if applicable.
          </p>
        </section>

        <section>
          <h2>5. Prohibited Conduct</h2>
          <p>No unlawful, fraudulent, or abusive use of the platform.</p>
        </section>

        <section>
          <h2>6. Disclaimers & Limitation of Liability</h2>
          <p>
            The platform is provided “as is” without warranties. To the maximum
            extent permitted by law, AProNXTDOOR is not liable for indirect or
            consequential damages.
          </p>
        </section>

        <section>
          <h2>7. Changes</h2>
          <p>
            We may update these Terms. Continued use constitutes acceptance of
            changes.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>
            Questions? Contact us at{" "}
            <a href="mailto:legal@apronxtdoor.com">legal@apronxtdoor.com</a>.
          </p>
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
