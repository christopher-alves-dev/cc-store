import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { prismaClient } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: ["identify", "email"].join(" ") } },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "email",
          type: "email",
          placeholder: "user@test.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "test-pass",
        },
      },

      async authorize(credentials) {
        const user = { id: 1, name: "user@test.com", password: "test-pass" };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          const getUserTester = await prismaClient.user.findFirst({
            where: { email: user.name },
          });
          return getUserTester;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user = { ...session.user, id: user ? user.id : token.sub } as {
        id: string;
        name: string;
        email: string;
      };

      return session;
    },
  },
};
