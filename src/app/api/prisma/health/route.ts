import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const startTime = Date.now()
    
    // Test basic queries
    const [userCount, vendorCount, subscriptionStats] = await Promise.all([
      prisma.user.count({}),
      prisma.vendor.count(),
      prisma.subscription.groupBy({
        by: ['status'],
        _count: {
          id: true
        }
      })
    ])
    
    const endTime = Date.now()
    const queryTime = endTime - startTime

    return NextResponse.json({
      status: 'healthy',
      database: {
        users: userCount,
        vendors: vendorCount,
        subscriptionStats: subscriptionStats,
        queryTime: `${queryTime}ms`,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Prisma health check failed:', error)
    return NextResponse.json(
      { 
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}