import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mockData = {
  stats: {
    totalUsers: 1248,
    totalSubscriptions: 892,
    activeSubscriptions: 756,
    monthlyRevenue: 12850,
    userGrowth: 12,
    subscriptionGrowth: 8,
    activeGrowth: 15,
    revenueGrowth: 22
  },
  prismaHealth: {
    status: "healthy",
    queryTime: "45ms",
    database: "SQLite",
    version: "6.16.3"
  },
  subscriptions: [
    {
      id: "1",
      vendorId: "vendor1",
      vendor: { name: "Quality Builders Inc." },
      amount: 150,
      status: "ACTIVE",
      lastPayment: new Date().toISOString(),
      nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: "Credit Card",
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      vendorId: "vendor2",
      vendor: { name: "Premium Services LLC" },
      amount: 150,
      status: "ACTIVE",
      lastPayment: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      nextPayment: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: "PayPal",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  vendors: [
    {
      id: "vendor1",
      name: "Quality Builders Inc.",
      email: "contact@qualitybuilders.com",
      phone: "+1-555-0123",
      location: "New York, NY",
      rating: 4.8,
      totalReviews: 120,
      services: "Construction, Renovation",
      subscriptionStatus: "ACTIVE",
      subscriptionSince: new Date('2023-05-20').toISOString(),
      totalQuotes: 45,
      completedJobs: 38,
      createdAt: new Date('2023-05-20').toISOString(),
      subscriptions: [{ status: "ACTIVE" }]
    },
    {
      id: "vendor2",
      name: "Premium Services LLC",
      email: "info@premiumservices.com",
      phone: "+1-555-0124",
      location: "Los Angeles, CA",
      rating: 4.6,
      totalReviews: 89,
      services: "Plumbing, Electrical",
      subscriptionStatus: "ACTIVE",
      subscriptionSince: new Date('2023-06-15').toISOString(),
      totalQuotes: 32,
      completedJobs: 28,
      createdAt: new Date('2023-06-15').toISOString(),
      subscriptions: [{ status: "ACTIVE" }]
    }
  ],
  performance: {
    avgQueryTime: "45ms",
    totalQueries: 1250,
    database: "SQLite"
  }
};