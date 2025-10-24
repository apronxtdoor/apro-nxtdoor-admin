import { NextResponse } from 'next/server'
import { mockData } from '@/lib/utils';

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    return NextResponse.json(mockData.subscriptions)
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(mockData.subscriptions)
  }
}