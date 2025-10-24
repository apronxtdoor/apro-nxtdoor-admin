import { NextResponse } from 'next/server'
import { mockData } from '@/lib/utils';

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const stats = {
      totalUsers: mockData.stats.totalUsers,
      totalVendors: 856,
      activeSubscriptions: mockData.stats.activeSubscriptions,
      pendingSubscriptions: 45,
      totalQuotes: 2341,
      pendingApprovals: 23,
      totalRevenue: mockData.stats.monthlyRevenue
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({
      totalUsers: mockData.stats.totalUsers,
      totalVendors: 856,
      activeSubscriptions: mockData.stats.activeSubscriptions,
      pendingSubscriptions: 45,
      totalQuotes: 2341,
      pendingApprovals: 23,
      totalRevenue: mockData.stats.monthlyRevenue
    })
  }
}