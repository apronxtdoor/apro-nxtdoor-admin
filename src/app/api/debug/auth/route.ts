import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Test Google OAuth configuration
    const googleConfig = {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ? '***' + process.env.GOOGLE_CLIENT_SECRET.slice(-4) : 'Not set',
      redirectUri: process.env.NEXTAUTH_URL ? `${process.env.NEXTAUTH_URL}/api/auth/callback/google` : 'Not set',
    };

    return NextResponse.json({
      success: true,
      session: session,
      googleConfig,
      environment: {
        hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
        hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        nextAuthUrl: process.env.NEXTAUTH_URL,
        nodeEnv: process.env.NODE_ENV,
        databaseUrlSet: !!process.env.DATABASE_URL,
      },
      urls: {
        signIn: `${process.env.NEXTAUTH_URL}/auth/signin`,
        callback: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
        api: `${process.env.NEXTAUTH_URL}/api/auth`,
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
    });
  }
}