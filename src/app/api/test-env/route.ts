import { NextResponse } from 'next/server';

export async function GET() {
  const environment = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Not set',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Not set',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Not set',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || '❌ Not set',
    DATABASE_URL: process.env.DATABASE_URL ? '✅ Set' : '❌ Not set',
  };

  // Check if values are dummy
  const warnings = [];
  if (process.env.GOOGLE_CLIENT_ID === 'dummy-client-id') {
    warnings.push('GOOGLE_CLIENT_ID is using dummy value');
  }
  if (process.env.GOOGLE_CLIENT_SECRET === 'dummy-client-secret') {
    warnings.push('GOOGLE_CLIENT_SECRET is using dummy value');
  }
  if (process.env.NEXTAUTH_SECRET === 'your-secret-key-here') {
    warnings.push('NEXTAUTH_SECRET is using dummy value');
  }

  return NextResponse.json({
    environment,
    warnings,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    vercelUrl: process.env.VERCEL_URL,
  });
}