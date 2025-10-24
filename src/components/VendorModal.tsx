"use client";

import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Updated Vendor interface to match the real data
interface Vendor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  rating: number;
  totalReviews: number;
  services: string[];
  subscriptionStatus: "ACTIVE" | "PENDING" | "EXPIRED" | "SUSPENDED";
  subscriptionSince?: string;
  totalQuotes: number;
  completedJobs: number;
  createdAt: string;
  updatedAt: string;
}

interface VendorModalProps {
  vendor: Vendor | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (
    vendorId: string,
    newStatus: "ACTIVE" | "PENDING" | "EXPIRED" | "SUSPENDED"
  ) => void;
}

export default function VendorModal({
  vendor,
  isOpen,
  onClose,
  onStatusChange,
}: VendorModalProps) {
  if (!isOpen || !vendor) return null;

  const RatingStars = ({ rating }: { rating: number }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= Math.floor(rating)
              ? "text-yellow-400 fill-current"
              : i === Math.ceil(rating) && rating % 1 !== 0
              ? "text-yellow-400 fill-current opacity-50"
              : "text-gray-300"
          }`}
        />
      );
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-green-800 bg-green-100";
      case "PENDING":
        return "text-yellow-800 bg-yellow-100";
      case "EXPIRED":
        return "text-red-800 bg-red-100";
      case "SUSPENDED":
        return "text-gray-800 bg-gray-100";
      default:
        return "text-gray-800 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "Active";
      case "PENDING":
        return "Pending";
      case "EXPIRED":
        return "Expired";
      case "SUSPENDED":
        return "Suspended";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{vendor.name}</h2>
            <p className="text-gray-600">Vendor Details</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Close"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{vendor.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">
                    {vendor.phone || "Not provided"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">
                    {vendor.location || "Location not set"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Rating & Reviews
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <RatingStars rating={vendor.rating} />
                  <span className="text-gray-700">
                    {vendor.rating.toFixed(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {vendor.totalReviews} total reviews
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Info */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Subscription Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    vendor.subscriptionStatus
                  )}`}
                >
                  {getStatusText(vendor.subscriptionStatus)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Member Since</span>
                <span className="text-gray-900 flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {vendor.subscriptionSince
                      ? new Date(vendor.subscriptionSince).toLocaleDateString()
                      : "Not subscribed"}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Performance Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {vendor.totalQuotes}
                </div>
                <div className="text-sm text-blue-800">Total Quotes</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {vendor.completedJobs}
                </div>
                <div className="text-sm text-green-800">Completed Jobs</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {vendor.totalQuotes > 0
                    ? Math.round(
                        (vendor.completedJobs / vendor.totalQuotes) * 100
                      )
                    : 0}
                  %
                </div>
                <div className="text-sm text-purple-800">Success Rate</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {vendor.rating.toFixed(1)}
                </div>
                <div className="text-sm text-yellow-800">Avg Rating</div>
              </div>
            </div>
          </div>

          {/* Services */}
          {vendor.services && vendor.services.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Services Offered
              </h3>
              <div className="flex flex-wrap gap-2">
                {vendor.services.map((service, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Manage Vendor</h3>
            <div className="flex space-x-3">
              {vendor.subscriptionStatus === "PENDING" && (
                <>
                  <button
                    onClick={() => onStatusChange(vendor.id, "ACTIVE")}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve Vendor</span>
                  </button>
                  <button
                    onClick={() => onStatusChange(vendor.id, "EXPIRED")}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Reject Vendor</span>
                  </button>
                </>
              )}
              <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Send Message
              </button>
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View Full History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
