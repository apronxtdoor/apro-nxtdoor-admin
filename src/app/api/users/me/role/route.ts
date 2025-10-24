import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { role } = await req.json()
  if (!['USER', 'VENDOR'].includes(role)) {
    return NextResponse.json({ error: 'Bad role' }, { status: 400 })
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: { role: role as Role, onboarded: true },
  })

  return NextResponse.json({ ok: true })
}
