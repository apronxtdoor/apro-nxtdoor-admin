import { NextResponse } from 'next/server'
import { mockData } from '@/lib/utils';

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    return NextResponse.json(mockData.vendors)
  } catch (error) {
    console.error('Error fetching vendors:', error)
    return NextResponse.json(mockData.vendors)
  }
}