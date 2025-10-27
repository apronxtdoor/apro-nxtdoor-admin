"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignInClient() {
  const qs = useSearchParams();
  const intent = (qs.get("intent") || "USER").toUpperCase(); // USER | VENDOR
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const error = qs.get("error");

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await signIn("email", {
        email,
        callbackUrl: "/auth/select-role",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="screen">
      <header className="topbar">
        <Link href="/" className="brand">
          AProNXTDOOR
        </Link>
      </header>

      <section className="center">
        <div className="card">
          <h1 className="title">
            <span>Sign in to</span> <strong>AProNXTDOOR</strong>
          </h1>
          <p className="subtitle">
            {intent === "VENDOR"
              ? "Continue as a Vendor"
              : "Continue as a User"}
          </p>

          {error && <div className="alert">{friendlyError(error)}</div>}

          <button
            className="btn google"
            onClick={() =>
              signIn("google", { callbackUrl: "/auth/select-role" })
            }
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="or">or</div>

          <form onSubmit={handleEmail} className="emailForm">
            <label htmlFor="email" className="label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <button
              type="submit"
              className="btn primary"
              disabled={!email || submitting}
            >
              {submitting ? "Sending magic link…" : "Continue with Email"}
            </button>
          </form>

          <p className="legal">
            By continuing, you agree to our <Link href="/terms">Terms</Link>
            &nbsp;and&nbsp;
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
          <div className="back">
            <Link href="/">← Back to home</Link>
          </div>
        </div>
      </section>

      <style>{styles}</style>
    </main>
  );
}

function friendlyError(code: string) {
  switch (code) {
    case "OAuthCallback":
      return "We couldn’t complete the sign-in. Please try again (in the same tab).";
    case "Configuration":
      return "Sign-in is temporarily unavailable.";
    case "AccessDenied":
      return "Access denied for this account.";
    default:
      return "Something went wrong signing you in. Please try again.";
  }
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.2 29.3 35 24 35c-7.2 0-13-5.8-13-13S16.8 9 24 9c3.3 0 6.3 1.2 8.6 3.2l5.7-5.7C34.8 3.6 29.7 1.5 24 1.5 11.6 1.5 1.5 11.6 1.5 24S11.6 46.5 24 46.5c12 0 22-9 22-22 0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16.2 19 13.5 24 13.5c3.3 0 6.3 1.2 8.6 3.2l5.7-5.7C34.8 3.6 29.7 1.5 24 1.5 15.5 1.5 8.1 6.2 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 46.5c5.2 0 10-1.8 13.8-4.8l-6.4-5.2c-2 1.3-4.6 2-7.4 2-5.2 0-9.7-3.3-11.3-7.9l-6.6 5.1C8 41.8 15.3 46.5 24 46.5z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1.7 4.7-6.1 7.9-11.3 7.9-3.1 0-5.9-1.1-8.1-2.9l-6.6 5.1C12.1 43.8 17.7 46.5 24 46.5c12 0 22-9 22-22 0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}

const styles = `
:root{--indigo:#667eea;--purple:#764ba2;--ink:#0f172a;--muted:#475569;--bg:#f8fafc;--white:#fff;--border:#e2e8f0;}
*{box-sizing:border-box}
.screen{min-height:100vh;background:radial-gradient(1200px 600px at 15% -10%, rgba(102,126,234,.25), transparent),radial-gradient(1200px 600px at 85% 110%, rgba(118,75,162,.25), transparent),linear-gradient(135deg,#eef2ff,#faf5ff);display:grid;grid-template-rows:auto 1fr}
.topbar{display:flex;align-items:center;justify-content:center;padding:16px}
.brand{font-weight:800;font-size:20px;background:linear-gradient(135deg,var(--indigo),var(--purple));-webkit-background-clip:text;background-clip:text;color:transparent;text-decoration:none}
.center{display:grid;place-items:center;padding:24px}
.card{width:100%;max-width:440px;padding:22px 22px 18px;border-radius:16px;background:var(--white);border:2px solid transparent;background:linear-gradient(#fff,#fff) padding-box,linear-gradient(135deg,var(--indigo),var(--purple)) border-box;box-shadow:0 12px 40px rgba(0,0,0,.08)}
.title{margin:2px 0 4px;text-align:center;font-size:22px;color:var(--ink)}.title strong{font-weight:800}
.subtitle{text-align:center;color:var(--muted);margin-bottom:16px}
.alert{margin-bottom:12px;padding:10px 12px;border-radius:10px;background:#fff1f2;color:#9f1239;border:1px solid #fecdd3;font-size:.9rem}
.btn{width:100%;display:flex;align-items:center;justify-content:center;gap:10px;border:0;border-radius:12px;padding:12px 14px;font-weight:700;cursor:pointer;transition:transform .06s ease,box-shadow .2s ease}
.btn:active{transform:translateY(1px)}
.btn.google{background:#fff;border:1px solid var(--border);color:var(--ink);box-shadow:0 4px 16px rgba(102,126,234,.12)}
.btn.google:hover{border-color:var(--indigo)}
.btn.primary{margin-top:10px;color:#fff;background:linear-gradient(135deg,var(--indigo),var(--purple));box-shadow:0 6px 20px rgba(118,75,162,.25)}
.btn.primary:disabled{opacity:.7;cursor:not-allowed}
.or{text-align:center;color:var(--muted);font-size:.85rem;margin:12px 0;position:relative}
.or::before,.or::after{content:"";position:absolute;top:50%;width:35%;height:1px;background:var(--border)}.or::before{left:0}.or::after{right:0}
.emailForm{display:flex;flex-direction:column}
.label{font-size:.85rem;color:var(--muted);margin-bottom:6px}
.input{border:1px solid var(--border);border-radius:12px;padding:12px 14px;outline:none;font-size:.95rem}
.input:focus{border-color:var(--indigo);box-shadow:0 0 0 4px rgba(102,126,234,.12)}
.legal{margin:12px 0 6px;text-align:center;color:var(--muted);font-size:.8rem}
.legal a{color:var(--indigo);text-decoration:none}.legal a:hover{text-decoration:underline}
.back{text-align:center;margin-top:6px}.back a{color:var(--muted);text-decoration:none;font-size:.9rem}.back a:hover{color:var(--ink)}
@media (max-width:420px){.card{padding:18px}}
`;
