import { Server as SocketIOServer } from "socket.io";
import { PrismaClient } from "@prisma/client";

interface AnalyticsData {
  summary: {
    totalUsers: number;
    totalVendors: number;
    activeSubscriptions: number;
    pendingSubscriptions: number;
    totalRevenue: number;
  };
}

export class SocketServer {
  private io: SocketIOServer;
  private prisma: PrismaClient;

  constructor(server: any) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });
    this.prisma = new PrismaClient();
    this.setupSocketEvents();
  }

  private setupSocketEvents() {
    this.io.on("connection", (socket: import("socket.io").Socket) => {
      console.log("Client connected:", socket.id);

      // Send initial analytics data
      socket.on("request-analytics", async () => {
        try {
          const analyticsData: AnalyticsData = await this.getAnalyticsData();
          socket.emit("analytics-data", analyticsData);
        } catch (error) {
          console.error("Error fetching analytics data:", error);
          socket.emit("error", { message: "Failed to fetch analytics data" });
        }
      });

      // Real-time update payloads
      interface VendorUpdatePayload {
        count: number;
        timestamp: Date;
      }

      interface SubscriptionUpdatePayload {
        activeSubscriptions: number;
        timestamp: Date;
      }

      // Handle real-time updates
      socket.on("subscribe-updates", () => {
        console.log("Client subscribed to real-time updates:", socket.id);

        // Set up intervals to send periodic updates
        const vendorInterval: NodeJS.Timeout = setInterval(async () => {
          try {
            const vendorCount: number = await this.prisma.vendor.count();
            const payload: VendorUpdatePayload = {
              count: vendorCount,
              timestamp: new Date(),
            };
            socket.emit("vendor-update", payload);
          } catch (error) {
            console.error("Error fetching vendor count:", error);
          }
        }, 30000);

        const subscriptionInterval: NodeJS.Timeout = setInterval(async () => {
          try {
            const activeSubscriptions: number = await this.prisma.subscription.count({
              where: { status: "ACTIVE" },
            });
            const payload: SubscriptionUpdatePayload = {
              activeSubscriptions,
              timestamp: new Date(),
            };
            socket.emit("subscription-update", payload);
          } catch (error) {
            console.error("Error fetching subscription count:", error);
          }
        }, 30000);

        socket.on("disconnect", () => {
          clearInterval(vendorInterval);
          clearInterval(subscriptionInterval);
          console.log("Client disconnected:", socket.id);
        });
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  }

  private async getAnalyticsData(): Promise<AnalyticsData> {
    try {
      const [
        totalUsers,
        totalVendors,
        activeSubscriptions,
        pendingSubscriptions,
        totalRevenueResult,
      ] = await Promise.all([
        this.prisma.user.count(),
        this.prisma.vendor.count(),
        this.prisma.subscription.count({ where: { status: "ACTIVE" } }),
        this.prisma.subscription.count({ where: { status: "PENDING" } }),
        this.prisma.subscription.aggregate({
          where: { status: "ACTIVE" },
          _sum: { amount: true },
        }),
      ]);

      return {
        summary: {
          totalUsers,
          totalVendors,
          activeSubscriptions,
          pendingSubscriptions,
          totalRevenue: totalRevenueResult._sum.amount || 0,
        },
      };
    } catch (error) {
      console.error("Error in getAnalyticsData:", error);
      throw error;
    }
  }

  // Method to broadcast updates to all connected clients
  public broadcastAnalyticsUpdate() {
    this.getAnalyticsData()
      .then((data) => {
        this.io.emit("analytics-update", data);
      })
      .catch((error) => {
        console.error("Error broadcasting analytics update:", error);
      });
  }

  // Method to get server instance (for use in API routes)
  public getIO(): SocketIOServer {
    return this.io;
  }
}

// Singleton instance
let socketServer: SocketServer | null = null;

export function initializeSocketServer(server: any): SocketServer {
  if (!socketServer) {
    socketServer = new SocketServer(server);
  }
  return socketServer;
}

export function getSocketServer(): SocketServer | null {
  return socketServer;
}
