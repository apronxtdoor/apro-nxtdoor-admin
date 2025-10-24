// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const runtime = "nodejs";

// Build providers dynamically
const providers: any[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  }),
];

// Only add Email provider if both vars exist
if (process.env.EMAIL_SERVER && process.env.EMAIL_FROM) {
  providers.push(
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      maxAge: 60 * 60, // 1 hour
    })
  );
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },

  callbacks: {
    // Add DB role/onboarded/id to the JWT on every request
    async jwt({ token, user }) {
      const email =
        (user as any)?.email ??
        (token as any)?.email ??
        token.email ??
        undefined;

      if (email) {
        const dbUser = await prisma.user.findUnique({
          where: { email },
          select: { id: true, role: true, onboarded: true },
        });

        if (dbUser) {
          (token as any).uid = dbUser.id;
          (token as any).role = dbUser.role;
          (token as any).onboarded = dbUser.onboarded;
          (token as any).email = email; // keep email on token for later lookups
        }
      }
      return token;
    },

    // Ensure session mirrors the latest DB state (immediate updates after role pick)
    async session({ session, token }) {
      const email = session.user?.email ?? (token as any)?.email;

      if (email) {
        const dbUser = await prisma.user.findUnique({
          where: { email },
          select: { id: true, role: true, onboarded: true },
        });

        if (dbUser) {
          (session.user as any).id = dbUser.id;
          (session.user as any).role = dbUser.role;
          (session.user as any).onboarded = dbUser.onboarded;
        } else {
          // fallback from JWT if DB lookup failed
          (session.user as any).id = (token as any)?.uid;
          (session.user as any).role = (token as any)?.role;
          (session.user as any).onboarded = (token as any)?.onboarded;
        }
      }
      return session;
    },

    // Gate the role picker to non-admins only
    async signIn({ user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { role: true, onboarded: true },
        });

        // Admins bypass role selection entirely
        if (dbUser?.role === "ADMIN") return true;

        // Non-admins must complete onboarding (role selection)
        if (!dbUser?.onboarded) {
          return "/auth/select-role";
        }
      }
      return true;
    },

    // Keep redirects safe and preserve same-origin callbackUrls
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        const parsed = new URL(url);
        if (parsed.origin === baseUrl) return url;
      } catch {
        // ignore bad URLs
      }
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
