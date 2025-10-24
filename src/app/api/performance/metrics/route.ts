import { NextResponse } from 'next/server'
import { mockData } from '@/lib/utils';

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    return NextResponse.json(mockData.performance)
  } catch (error) {
    console.error('Error fetching performance metrics:', error)
    return NextResponse.json(mockData.performance)
  }
}