import { NextResponse } from 'next/server'
import { mockData } from '@/lib/utils';

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    return NextResponse.json(mockData.prismaHealth)
  } catch (error) {
    console.error('Error in health check:', error)
    return NextResponse.json(mockData.prismaHealth)
  }
}