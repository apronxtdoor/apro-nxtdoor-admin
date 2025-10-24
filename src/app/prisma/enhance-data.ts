import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function enhanceData() {
  try {
    // Add more vendors with different dates for better analytics
    const additionalVendors = [
      {
        name: 'Quick Fix Carpentry',
        email: 'quick@carpentry.com',
        phone: '+1234567893',
        location: 'Pretoria',
        rating: 4.4,
        totalReviews: 45,
        services: 'Carpentry, Furniture Repair, Woodworking',
        subscriptionStatus: 'ACTIVE',
        subscriptionSince: new Date('2024-03-15'),
        totalQuotes: 67,
        completedJobs: 58,
      },
      {
        name: 'Garden Masters',
        email: 'info@gardenmasters.com',
        phone: '+1234567894',
        location: 'Stellenbosch',
        rating: 4.9,
        totalReviews: 89,
        services: 'Gardening, Landscaping, Tree Surgery',
        subscriptionStatus: 'ACTIVE',
        subscriptionSince: new Date('2024-02-20'),
        totalQuotes: 112,
        completedJobs: 104,
      },
      {
        name: 'Clean Pro Services',
        email: 'clean@pro.com',
        phone: '+1234567895',
        location: 'Port Elizabeth',
        rating: 4.2,
        totalReviews: 34,
        services: 'Cleaning, Deep Cleaning, Office Cleaning',
        subscriptionStatus: 'PENDING',
        totalQuotes: 23,
        completedJobs: 18,
      }
    ]

    for (const vendorData of additionalVendors) {
      await prisma.vendor.create({
        data: vendorData
      })
    }

    console.log('Enhanced data created successfully')
  } catch (error) {
    console.error('Error enhancing data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

enhanceData()