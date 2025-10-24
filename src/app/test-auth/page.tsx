"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function TestAuth() {
  const { data: session, status } = useSession();

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Test</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Session Status: {status}</h2>

        {session ? (
          <div>
            <p>Signed in as: {session.user?.email}</p>
            <p>Name: {session.user?.name}</p>
            <button
              onClick={() => signOut()}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <p>Not signed in</p>
            <button
              onClick={() => signIn("google")}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Sign in with Google
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-semibold mb-2">Environment Variables:</h3>
        <div className="text-sm">
          <div>
            GOOGLE_CLIENT_ID: {process.env.GOOGLE_CLIENT_ID ? "✅" : "❌"}
          </div>
          <div>NEXTAUTH_URL: {process.env.NEXTAUTH_URL || "Not set"}</div>
        </div>
      </div>
    </div>
  );
}
