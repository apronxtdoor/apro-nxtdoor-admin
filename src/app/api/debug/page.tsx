"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function DebugPage() {
  const { data: session, status } = useSession();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Debug</h1>

      <div className="grid gap-6">
        {/* Session Status */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Session Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Status:</strong>
              <span
                className={`ml-2 px-2 py-1 rounded ${
                  status === "loading"
                    ? "bg-yellow-100 text-yellow-800"
                    : status === "authenticated"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status}
              </span>
            </div>
            <div>
              <strong>User:</strong> {session?.user?.name || "Not signed in"}
            </div>
          </div>
        </div>

        {/* Environment Check */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Environment Check</h2>
          <div className="space-y-2">
            <div>
              <strong>NEXTAUTH_URL:</strong>{" "}
              {process.env.NEXTAUTH_URL || "Not set"}
            </div>
            <div>
              <strong>Google Client ID:</strong>{" "}
              {process.env.GOOGLE_CLIENT_ID ? "Set" : "Not set"}
            </div>
            <div>
              <strong>Database URL:</strong>{" "}
              {process.env.DATABASE_URL ? "Set" : "Not set"}
            </div>
          </div>
        </div>

        {/* Session Data */}
        {session && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Session Data</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        )}

        {/* Action Buttons */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Test Actions</h2>
          <div className="flex gap-4">
            {status === "unauthenticated" && (
              <>
                <button
                  onClick={() => signIn("google")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Sign in with Google
                </button>
                <button
                  onClick={() =>
                    signIn("google", { callbackUrl: "/dashboard" })
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Sign in & Redirect to Dashboard
                </button>
              </>
            )}
            {status === "authenticated" && (
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>

        {/* Test Links */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Test Links</h2>
          <div className="space-y-2">
            <div>
              <a
                href="/api/auth/signin"
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                Direct SignIn Page: /api/auth/signin
              </a>
            </div>
            <div>
              <a
                href="/api/auth/providers"
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                Check Providers: /api/auth/providers
              </a>
            </div>
            <div>
              <a
                href="/api/auth/session"
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                Check Session: /api/auth/session
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
