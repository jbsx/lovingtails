import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import prisma from "@/app/utils/db";

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
        const res = await prisma.admins.findFirst({
          where: {
            email: profile?.email,
          },
        });
        return res !== null;
      }
      return false; // Do different verification for other providers that don't have `email_verified`
    },
  },
  session: {
    maxAge: 3600, //in seconds (1 hour)
  },
} as NextAuthOptions);

export { handler as GET, handler as POST };
