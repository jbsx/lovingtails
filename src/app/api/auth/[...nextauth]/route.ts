import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        console.log(profile);
        return profile?.email === "booptybapty@gmail.com";
      }
      return false; // Do different verification for other providers that don't have `email_verified`
    },
  },
} as NextAuthOptions);

export { handler as GET, handler as POST };
