// src/app/api/select-role/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { PrismaClient } from '@prisma/client'

export const runtime = 'nodejs'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  // must be authenticated already (we allowed /api/* in middleware)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const email = token?.email as string | undefined
  if (!email) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
  }

  // read role from either JSON or form-encoded body
  let role = ''
  const ct = req.headers.get('content-type') || ''
  try {
    if (ct.includes('application/json')) {
      const body = await req.json()
      role = String(body.role ?? '')
    } else {
      const fd = await req.formData()
      role = String(fd.get('role') ?? '')
    }
  } catch { /* ignore parse errors, handled below */ }

  if (!['USER', 'VENDOR'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  await prisma.user.update({
    where: { email },
    data: { role, onboarded: true },
  })

  // 303 converts POST -> GET and prevents repeat submissions
  const dest = role === 'VENDOR' ? '/vendor-dashboard' : '/user-dashboard'
  return NextResponse.redirect(new URL(dest, req.url), 303)
}
