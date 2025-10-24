import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma"; // if you have a helper; otherwise new PrismaClient()

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.redirect(new URL("/auth/signin", req.url), 303);
  }

  const fd = await req.formData();
  const role = String(fd.get("role") || "");

  if (!["USER", "VENDOR"].includes(role)) {
    return new NextResponse("Invalid role", { status: 400 });
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: { role: role as any, onboarded: true },
  });

  const redirectTo = role === "VENDOR" ? "/vendor-dashboard" : "/user-dashboard";
  return NextResponse.redirect(new URL(redirectTo, req.url), 303);
}
