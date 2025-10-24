import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';
import { Session } from 'next-auth';

// Extend the default Session and User types
declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

// Enhanced logging
console.log('🔐 NextAuth Configuration Check:');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Missing');
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Missing');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || '❌ Missing');

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log('🔐 SignIn Attempt:', { 
        user: user?.email, 
        provider: account?.provider,
        profile: profile?.email 
      });
      
      // Allow all users to sign in
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl + '/dashboard'
    },
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  debug: true, // Always enable debug for now
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};