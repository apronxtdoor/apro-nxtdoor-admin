// src/middleware.ts
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: Request) {
  const url = new URL(req.url)
  if (!url.pathname.startsWith('/admin-dashboard')) return NextResponse.next()

  const token = await getToken({ req: req as any, secret: process.env.NEXTAUTH_SECRET })
  if (!token || (token as any).role !== 'ADMIN') {
    url.pathname = '/auth/signin'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}
export const config = { matcher: ['/admin-dashboard/:path*'] }
