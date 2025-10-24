import { NextResponse } from 'next/server';
import { aiEngine } from '@/lib/ai-recommendations';

export async function POST(request: Request) {
  try {
    const userBehavior = await request.json();
    
    const recommendations = await aiEngine.getRecommendations(userBehavior);
    const predictions = await aiEngine.predictUserNeeds(userBehavior);

    return NextResponse.json({
      success: true,
      recommendations,
      predictions,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to generate recommendations'
    }, { status: 500 });
  }
}