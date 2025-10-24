import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    console.error('Database health check failed:', error);
    return NextResponse.json(
      { status: 'Error', database: 'Disconnected' },
      { status: 500 }
    );
  }
}