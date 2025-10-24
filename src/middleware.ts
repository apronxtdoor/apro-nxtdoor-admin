import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect admin areas
  if (pathname.startsWith('/admin-dashboard') || pathname.startsWith('/api/admin')) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const role = (token as any)?.role;
    if (role !== 'ADMIN') {
      const url = new URL('/auth/signin', req.url);
      url.searchParams.set('callbackUrl', '/admin-dashboard');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-dashboard', '/api/admin/:path*'],
};
