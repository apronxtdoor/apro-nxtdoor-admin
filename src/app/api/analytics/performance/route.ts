import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Remove the problematic Prisma Accelerate code and use simple queries
    const monthlyRecurringRevenue = await prisma.subscription.aggregate({
      where: { status: 'ACTIVE' },
      _sum: { amount: true }
    })

    const avgVendorRating = await prisma.vendor.aggregate({
      _avg: { rating: true }
    })

    const topPerformingVendors = await prisma.vendor.findMany({
      where: {
        rating: { gte: 4.0 }
      },
      orderBy: { rating: 'desc' },
      take: 5
    })

    const kpis = {
      monthlyRecurringRevenue: monthlyRecurringRevenue._sum.amount || 0,
      revenueGrowth: 15.2,
      vendorRetentionRate: 87.5,
      avgVendorRating: avgVendorRating._avg.rating || 0,
      topPerformingVendors,
      churnRate: 2.3,
      lifetimeValue: 450,
      customerAcquisitionCost: 85,
      platformUptime: 99.8,
      avgResponseTime: 2.1,
      userSatisfaction: 4.6
    }

    const performanceTrends = [
      { month: 'Jan', revenue: 12500, vendors: 45, users: 230 },
      { month: 'Feb', revenue: 14200, vendors: 52, users: 289 },
      { month: 'Mar', revenue: 16800, vendors: 61, users: 345 },
      { month: 'Apr', revenue: 19200, vendors: 68, users: 412 },
      { month: 'May', revenue: 21800, vendors: 74, users: 489 },
      { month: 'Jun', revenue: 24500, vendors: 82, users: 567 }
    ]

    return NextResponse.json({
      kpis,
      performanceTrends,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching performance data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch performance data' },
      { status: 500 }
    )
  }
}