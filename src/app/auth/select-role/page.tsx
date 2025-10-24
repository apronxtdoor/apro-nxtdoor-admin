"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SelectRolePage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin");
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return null;
  }

  return (
    <main className="wrap">
      <form className="card" method="POST" action="/api/select-role">
        <h1>Choose your role</h1>

        <label className="opt">
          <input type="radio" name="role" value="USER" defaultChecked />
          <span>Customer / User</span>
        </label>

        <label className="opt">
          <input type="radio" name="role" value="VENDOR" />
          <span>Vendor / Service provider</span>
        </label>

        <button type="submit" className="cta">
          Continue
        </button>

        <p className="back">
          <Link href="/">← Back to home</Link>
        </p>
      </form>

      <style>{`
        .wrap{min-height:100vh;display:grid;place-items:center;background:#f8fafc}
        .card{background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:22px 22px 16px;min-width:320px;box-shadow:0 10px 30px rgba(0,0,0,.06)}
        h1{font-size:20px;margin:0 0 14px}
        .opt{display:flex;gap:10px;align-items:center;margin:10px 0;padding:10px;border:1px solid #e5e7eb;border-radius:10px}
        .opt input{accent-color:#667eea}
        .cta{margin-top:12px;width:100%;border:0;border-radius:10px;padding:12px 14px;font-weight:700;color:#fff;background:linear-gradient(135deg,#667eea,#764ba2)}
        .back{margin-top:10px;text-align:center}
      `}</style>
    </main>
  );
}
