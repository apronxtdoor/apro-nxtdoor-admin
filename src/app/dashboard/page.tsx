import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <Link
            href="/api/auth/signout?callbackUrl=/"
            className="inline-flex items-center rounded-lg bg-red-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Sign Out
          </Link>
        </div>

        {!session?.user ? (
          <div className="rounded-2xl bg-white p-8 shadow-card ring-1 ring-black/5">
            <p className="text-slate-600">
              You are not signed in.{" "}
              <Link href="/auth/signin" className="text-indigo-600 underline">
                Sign in
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Welcome */}
            <section className="rounded-2xl bg-indigo-50 p-6 shadow-card ring-1 ring-black/5">
              <h2 className="text-lg font-semibold text-indigo-900">Welcome</h2>
              <p className="mt-3 text-sm text-indigo-900/80">
                {session.user.name}
                <br />
                {session.user.email}
              </p>
            </section>

            {/* Quick actions */}
            <section className="rounded-2xl bg-emerald-50 p-6 shadow-card ring-1 ring-black/5">
              <h2 className="text-lg font-semibold text-emerald-900">
                Quick Actions
              </h2>
              <div className="mt-3 space-y-2 text-sm">
                <Link className="text-emerald-700 hover:underline" href="#">
                  User Dashboard
                </Link>
                <br />
                <Link className="text-emerald-700 hover:underline" href="#">
                  Vendor Dashboard
                </Link>
              </div>
            </section>

            {/* Session info */}
            <section className="rounded-2xl bg-fuchsia-50 p-6 shadow-card ring-1 ring-black/5">
              <h2 className="text-lg font-semibold text-fuchsia-900">
                Session Info
              </h2>
              <pre className="mt-3 overflow-auto rounded-lg bg-white/70 p-4 text-xs leading-relaxed text-slate-800">
                {JSON.stringify(session, null, 2)}
              </pre>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
