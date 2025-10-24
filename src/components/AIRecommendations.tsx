"use client";
import { useState, useEffect } from "react";
import { UserBehavior } from "@/lib/ai-recommendations";

interface AIRecommendationsProps {
  userId: string;
  userLocation?: { lat: number; lng: number };
}

export default function AIRecommendations({
  userId,
  userLocation,
}: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const userBehavior: UserBehavior = {
          userId,
          searches: JSON.parse(localStorage.getItem("userSearches") || "[]"),
          clicks: JSON.parse(localStorage.getItem("userClicks") || "[]"),
          bookings: JSON.parse(localStorage.getItem("userBookings") || "[]"),
          location: userLocation,
        };

        const response = await fetch("/api/ai/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userBehavior),
        });

        const data = await response.json();
        if (data.success) {
          setRecommendations(data.recommendations);
        }
      } catch (error) {
        console.error("Failed to fetch AI recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId, userLocation]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <i className="fas fa-robot text-blue-500 mr-2"></i>
        AI-Powered Recommendations
      </h3>

      {recommendations.length === 0 ? (
        <p className="text-gray-500">
          No recommendations yet. Start using the platform to get personalized
          suggestions.
        </p>
      ) : (
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold">{rec.service}</h4>
              <p className="text-sm text-gray-600 mb-2">{rec.reason}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Confidence: {Math.round(rec.confidence * 100)}%
                </span>
                <span className="text-xs text-gray-500">
                  {rec.providers.length} providers
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
