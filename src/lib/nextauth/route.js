import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Add custom session properties here if needed
      return session;
    },
    async signIn({ user, account, profile }) {
      // Add custom sign-in logic here if needed
      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
    // Add other custom pages if needed
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };