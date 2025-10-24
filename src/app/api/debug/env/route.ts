// src/app/api/debug/env/route.ts
export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || null,
    has_GOOGLE_CLIENT_ID: Boolean(process.env.GOOGLE_CLIENT_ID),
    has_GOOGLE_CLIENT_SECRET: Boolean(process.env.GOOGLE_CLIENT_SECRET),
    has_NEXTAUTH_SECRET: Boolean(process.env.NEXTAUTH_SECRET),
    node_env: process.env.NODE_ENV,
  });
}
