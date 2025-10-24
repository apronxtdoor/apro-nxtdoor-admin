import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Remove userId and any other fields that don't exist in Vendor model
    const { userId, password, ...vendorData } = body
    
    const vendor = await prisma.vendor.create({
      data: {
        name: vendorData.name,
        email: vendorData.email,
        phone: vendorData.phone,
        location: vendorData.location,
        services: vendorData.services || [],
        rating: vendorData.rating || 0,
        totalReviews: vendorData.totalReviews || 0,
        subscriptionStatus: vendorData.subscriptionStatus || 'PENDING',
        totalQuotes: vendorData.totalQuotes || 0,
        completedJobs: vendorData.completedJobs || 0,
        // Don't include userId, password, or any other fields not in schema
      }
    })
    
    return NextResponse.json(vendor)
  } catch (error) {
    console.error('Error creating vendor:', error)
    return NextResponse.json(
      { error: 'Failed to create vendor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const vendors = await prisma.vendor.findMany({
      include: {
        subscriptions: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(vendors)
  } catch (error) {
    console.error('Error fetching vendors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vendors' },
      { status: 500 }
    )
  }
}