// src/app/api/debug/db/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const tables = await prisma.$queryRaw<{ name: string }[]>
      `SELECT name FROM sqlite_master WHERE type='table' ORDER BY name`;
    return NextResponse.json({
      databaseUrl: process.env.DATABASE_URL,
      tables: tables.map(t => t.name),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
