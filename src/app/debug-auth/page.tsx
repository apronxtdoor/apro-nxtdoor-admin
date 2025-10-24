"use client";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DebugAuth() {
  const { data: session, status, update } = useSession();
  const [providers, setProviders] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const loadDebugInfo = async () => {
      try {
        // Test environment variables
        const envResponse = await fetch("/api/test-env");
        const envData = await envResponse.json();

        // Test auth debug
        const authResponse = await fetch("/api/debug/auth");
        const authData = await authResponse.json();

        // Get providers
        const providersData = await getProviders();
        setProviders(providersData);

        setDebugInfo({
          env: envData,
          auth: authData,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Debug load error:", error);
      }
    };

    loadDebugInfo();
  }, []);

  const testSignIn = async () => {
    try {
      console.log("Starting Google sign in...");
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/dashboard",
      });

      console.log("Sign in result:", result);

      if (result?.error) {
        alert(`Sign in failed: ${result.error}`);
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Sign in error:", error);
      alert(`Sign in error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Authentication Debug
        </h1>

        {/* Session Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Session Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`p-4 rounded-lg ${
                status === "authenticated"
                  ? "bg-green-100 text-green-800"
                  : status === "unauthenticated"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              <strong>Status:</strong> {status}
            </div>
            <div className="p-4 bg-blue-100 text-blue-800 rounded-lg">
              <strong>User:</strong> {session?.user?.name || "Not signed in"}
            </div>
            <div className="p-4 bg-purple-100 text-purple-800 rounded-lg">
              <strong>Email:</strong> {session?.user?.email || "Not available"}
            </div>
          </div>
        </div>

        {/* Environment Check */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {debugInfo.env?.environment &&
              Object.entries(debugInfo.env.environment).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded"
                >
                  <span className="font-medium">{key}:</span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      value === "✅ Set" || value === "✅"
                        ? "bg-green-100 text-green-800"
                        : value === "❌ Not set" || value === "❌"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {String(value)}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Providers */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Available Providers</h2>
          {providers ? (
            <div className="space-y-2">
              {Object.values(providers).map((provider: any) => (
                <div
                  key={provider.id}
                  className="p-3 bg-green-50 text-green-800 rounded"
                >
                  ✅ {provider.name} - Ready
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 bg-red-50 text-red-800 rounded">
              ❌ No providers available
            </div>
          )}
        </div>

        {/* Test Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="flex flex-wrap gap-4">
            {status === "unauthenticated" && (
              <>
                <button
                  onClick={testSignIn}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-medium"
                >
                  Test Google Sign In
                </button>
                <button
                  onClick={() =>
                    signIn("google", { callbackUrl: "/dashboard" })
                  }
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-medium"
                >
                  Sign In with Redirect
                </button>
              </>
            )}
            {status === "authenticated" && (
              <>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 font-medium"
                >
                  Sign Out
                </button>
                <button
                  onClick={() => update()}
                  className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 font-medium"
                >
                  Refresh Session
                </button>
              </>
            )}
          </div>
        </div>

        {/* Raw Data */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Raw Data</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Session Data:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-60">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="font-medium mb-2">Debug Info:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-60">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/api/test-env"
              target="_blank"
              className="text-blue-600 hover:text-blue-800"
            >
              Test Environment API
            </a>
            <a
              href="/api/debug/auth"
              target="_blank"
              className="text-blue-600 hover:text-blue-800"
            >
              Auth Debug API
            </a>
            <a
              href="/auth/signin"
              className="text-blue-600 hover:text-blue-800"
            >
              Sign In Page
            </a>
            <a href="/dashboard" className="text-blue-600 hover:text-blue-800">
              Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
