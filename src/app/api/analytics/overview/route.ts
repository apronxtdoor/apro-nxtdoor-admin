import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const [
      totalUsers,
      totalVendors,
      activeSubscriptions,
      pendingSubscriptions,
      totalQuotes,
      pendingApprovals,
      totalRevenue
    ] = await Promise.all([
      prisma.user.count(),
      prisma.vendor.count(),
      prisma.subscription.count({ where: { status: 'ACTIVE' } }),
      prisma.subscription.count({ where: { status: 'PENDING' } }),
      prisma.quote.count(),
      prisma.vendor.count({ where: { subscriptionStatus: 'PENDING' } }),
      prisma.subscription.aggregate({
        where: { status: 'ACTIVE' },
        _sum: { amount: true }
      })
    ])

    const stats = {
      totalUsers,
      totalVendors,
      activeSubscriptions,
      pendingSubscriptions,
      totalQuotes,
      pendingApprovals,
      totalRevenue: totalRevenue._sum.amount || 0
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}