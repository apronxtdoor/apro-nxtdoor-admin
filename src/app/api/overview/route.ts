import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get current date and dates for last 6 months
    const now = new Date()
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, 1)
    
    // Revenue trends (last 6 months)
    const revenueRaw = await prisma.subscription.findMany({
      where: {
        status: 'ACTIVE',
        createdAt: { gte: sixMonthsAgo }
      },
      select: {
        amount: true,
        createdAt: true
      }
    })

    // Group by year and month
    const revenueMap = new Map<string, { year: number, month: number, totalRevenue: number, subscriptionCount: number }>()
    revenueRaw.forEach(sub => {
      const date = new Date(sub.createdAt)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const key = `${year}-${month}`
      if (!revenueMap.has(key)) {
        revenueMap.set(key, { year, month, totalRevenue: 0, subscriptionCount: 0 })
      }
      const entry = revenueMap.get(key)!
      entry.totalRevenue += Number(sub.amount)
      entry.subscriptionCount += 1
    })
    const revenueData = Array.from(revenueMap.values()).sort(
      (a, b) => a.year - b.year || a.month - b.month
    )

    // Vendor performance metrics
    const vendorPerformance = await prisma.vendor.findMany({
      select: {
        id: true,
        name: true,
        rating: true,
        totalReviews: true,
        totalQuotes: true,
        completedJobs: true,
        subscriptionStatus: true,
        services: true
      },
      orderBy: {
        rating: 'desc'
      },
      take: 10
    })

    // Subscription analytics
    const subscriptionStats = await prisma.subscription.groupBy({
      by: ['status'],
      _count: {
        id: true
      },
      _sum: {
        amount: true
      }
    })

    // User growth trends
    const userGrowthRaw = await prisma.user.groupBy({
      by: ['createdAt'],
      _count: {
        id: true
      },
      orderBy: [
        { createdAt: 'asc' }
      ],
      take: 100
    })

    // Post-process to group by year and month
    const userGrowthMap = new Map<string, { year: number, month: number, count: number }>()
    userGrowthRaw.forEach((row: any) => {
      const date = new Date(row.createdAt)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const key = `${year}-${month}`
      if (!userGrowthMap.has(key)) {
        userGrowthMap.set(key, { year, month, count: 0 })
      }
      userGrowthMap.get(key)!.count += row._count.id
    })
    const userGrowth = Array.from(userGrowthMap.values()).sort(
      (a, b) => a.year - b.year || a.month - b.month
    ).slice(-12)

    // Service category performance
    const servicePerformance = await prisma.vendor.groupBy({
      by: ['services'],
      _count: {
        id: true
      },
      _avg: {
        rating: true
      },
      _sum: {
        totalQuotes: true,
        completedJobs: true
      }
    })

    // Regional performance
    const regionalPerformance = await prisma.vendor.groupBy({
      by: ['location'],
      _count: {
        id: true
      },
      _avg: {
        rating: true
      },
      _sum: {
        totalQuotes: true,
        completedJobs: true
      }
    })

    const analyticsData = {
      revenueTrends: revenueData || [],
      vendorPerformance: vendorPerformance.map(v => ({
        ...v,
        services: v.services.split(',').map(s => s.trim()),
        completionRate: v.totalQuotes > 0 ? (v.completedJobs / v.totalQuotes) * 100 : 0
      })),
      subscriptionStats,
      userGrowth: userGrowth || [],
      servicePerformance: servicePerformance || [],
      regionalPerformance: regionalPerformance.filter(r => r.location) || [],
      summary: {
        totalVendors: await prisma.vendor.count(),
        activeSubscriptions: await prisma.subscription.count({ where: { status: 'ACTIVE' } }),
        totalRevenue: await prisma.subscription.aggregate({
          where: { status: 'ACTIVE' },
          _sum: { amount: true }
        }),
        avgVendorRating: await prisma.vendor.aggregate({
          _avg: { rating: true }
        })
      }
    }

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}