"use client";

import { useState } from "react";
import { Key, Cpu, CheckCircle, XCircle, Loader, Zap } from "lucide-react";

interface TestResult {
  success: boolean;
  message: string;
  data?: {
    service: string;
    capabilities: string[];
    rateLimit: string;
  };
}

export default function KeyTester() {
  const [apiKey, setApiKey] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const testApiKey = async () => {
    if (!apiKey.trim()) return;

    setTesting(true);
    setTestResult(null);

    try {
      const response = await fetch("/api/ai/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      });

      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setTesting(false);
    }
  };

  const clearResult = () => {
    setTestResult(null);
    setApiKey("");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Cpu className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">AI API Configuration</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your AI Service API Key
          </label>
          <div className="flex space-x-3">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              onKeyPress={(e) => e.key === "Enter" && testApiKey()}
            />
            <button
              onClick={testApiKey}
              disabled={testing || !apiKey.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
            >
              {testing ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Key className="w-4 h-4" />
              )}
              <span>{testing ? "Testing..." : "Test Key"}</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Your API key is never stored on our servers. Test it securely.
          </p>
        </div>

        {testResult && (
          <div
            className={`p-4 rounded-lg border ${
              testResult.success
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-start space-x-3">
              {testResult.success ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
              )}
              <div className="flex-1">
                <p
                  className={
                    testResult.success ? "text-green-800" : "text-red-800"
                  }
                >
                  {testResult.message}
                </p>
                {testResult.data && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700">
                        Service: {testResult.data.service}
                      </span>
                    </div>
                    <div className="text-sm text-green-700">
                      <span className="font-medium">Capabilities:</span>
                      <ul className="list-disc list-inside ml-2">
                        {testResult.data.capabilities.map(
                          (capability, index) => (
                            <li key={index}>{capability}</li>
                          )
                        )}
                      </ul>
                    </div>
                    <p className="text-sm text-green-700">
                      <span className="font-medium">Rate Limit:</span>{" "}
                      {testResult.data.rateLimit}
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={clearResult}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">
            Supported AI Services
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• OpenAI GPT-4 & GPT-3.5</li>
            <li>• Anthropic Claude</li>
            <li>• Google Gemini</li>
            <li>• Custom AI endpoints</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
