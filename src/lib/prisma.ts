// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

/**
 * Prisma singleton (avoids creating multiple clients in dev/hot-reload).
 */
declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
}

const prismaClient =
  global.__prisma__ ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.__prisma__ = prismaClient;
}

/**
 * Export the Prisma client for use across the app (NextAuth adapter, routes, etc.).
 */
export const prisma = prismaClient;
export default prisma;

/**
 * Optional: Lightweight real-time simulation service (placeholder for Prisma Pulse).
 * If/when you enable Pulse, replace the setInterval stubs with actual subscriptions.
 */
export class RealTimeService {
  constructor(private db: PrismaClient = prisma) {}

  // Simulate vendor changes every 30s
  subscribeToVendorChanges(callback: (payload: any) => void) {
    console.log("Subscribing to vendor changes…");
    return setInterval(() => {
      callback({ type: "vendor.update", data: { timestamp: new Date() } });
    }, 30_000);
  }

  // Simulate subscription changes every 30s
  subscribeToSubscriptionChanges(callback: (payload: any) => void) {
    console.log("Subscribing to subscription changes…");
    return setInterval(() => {
      callback({ type: "subscription.update", data: { timestamp: new Date() } });
    }, 30_000);
  }
}

export const realTimeService = new RealTimeService();
