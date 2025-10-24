import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@apronxtdoor.com',
      role: 'ADMIN',
    }
  })

  // Create sample vendors (services as comma-separated strings)
  const vendor1 = await prisma.vendor.create({
    data: {
      name: 'Premium Plumbing Services',
      email: 'premium@plumbing.com',
      phone: '+1234567890',
      location: 'Johannesburg',
      rating: 4.8,
      totalReviews: 124,
      services: 'Plumbing, Emergency Repairs, Installation', // Comma-separated string
      subscriptionStatus: 'ACTIVE',
      subscriptionSince: new Date('2024-01-15'),
      totalQuotes: 89,
      completedJobs: 76,
    }
  })

  const vendor2 = await prisma.vendor.create({
    data: {
      name: 'Elite Electrical Works',
      email: 'elite@electrical.com',
      phone: '+1234567891',
      location: 'Cape Town',
      rating: 4.6,
      totalReviews: 89,
      services: 'Electrical, Wiring, Installation', // Comma-separated string
      subscriptionStatus: 'PENDING',
      totalQuotes: 45,
      completedJobs: 32,
    }
  })

  const vendor3 = await prisma.vendor.create({
    data: {
      name: 'Quality Painting Pros',
      email: 'quality@painting.com',
      phone: '+1234567892',
      location: 'Durban',
      rating: 4.7,
      totalReviews: 67,
      services: 'Painting, Wall Repair, Color Consultation',
      subscriptionStatus: 'ACTIVE',
      subscriptionSince: new Date('2024-02-01'),
      totalQuotes: 56,
      completedJobs: 48,
    }
  })

  // Create subscriptions
  await prisma.subscription.create({
    data: {
      vendorId: vendor1.id,
      amount: 150,
      status: 'ACTIVE',
      lastPayment: new Date(),
      nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      paymentMethod: 'Credit Card'
    }
  })

  await prisma.subscription.create({
    data: {
      vendorId: vendor2.id,
      amount: 150,
      status: 'PENDING',
      paymentMethod: 'Manual Approval'
    }
  })

  await prisma.subscription.create({
    data: {
      vendorId: vendor3.id,
      amount: 150,
      status: 'ACTIVE',
      lastPayment: new Date(),
      nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      paymentMethod: 'Bank Transfer'
    }
  })

  // Create some quotes
  await prisma.quote.create({
    data: {
      title: 'Kitchen Plumbing Repair',
      description: 'Fix leaking kitchen sink and install new faucet',
      budget: 1200,
      status: 'COMPLETED',
      userId: adminUser.id,
      vendorId: vendor1.id,
    }
  })

  await prisma.quote.create({
    data: {
      title: 'House Wiring Update',
      description: 'Update electrical wiring for entire house',
      budget: 8500,
      status: 'PENDING',
      userId: adminUser.id,
      vendorId: vendor2.id,
    }
  })

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })