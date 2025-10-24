export const mockData = {
  stats: {
    totalUsers: 1250,
    totalSubscriptions: 890,
    activeSubscriptions: 745,
    monthlyRevenue: 12500,
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
      vendor: { name: "Example Vendor Inc." },
      amount: 150,
      status: "ACTIVE",
      lastPayment: new Date().toISOString(),
      nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: "Credit Card",
      createdAt: new Date().toISOString()
    }
  ],
  vendors: [
    {
      id: "vendor1",
      name: "Example Vendor Inc.",
      email: "vendor@example.com",
      phone: "+1234567890",
      location: "New York, NY",
      rating: 4.5,
      totalReviews: 120,
      services: "Plumbing, Electrical, Carpentry",
      subscriptionStatus: "ACTIVE",
      subscriptionSince: new Date().toISOString(),
      totalQuotes: 45,
      completedJobs: 38,
      createdAt: new Date().toISOString(),
      subscriptions: [{ status: "ACTIVE" }]
    }
  ],
  performance: {
    avgQueryTime: "45ms",
    totalQueries: 1250,
    database: "SQLite"
  }
};