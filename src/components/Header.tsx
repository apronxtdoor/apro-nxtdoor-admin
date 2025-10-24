// example: src/components/Header.tsx
"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function Header() {
  const { data } = useSession();
  const role = (data?.user as any)?.role;

  return (
    <nav className="flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/pricing">Pricing</Link>
      {role === "ADMIN" && <Link href="/admin-dashboard">Admin</Link>}
    </nav>
  );
}
