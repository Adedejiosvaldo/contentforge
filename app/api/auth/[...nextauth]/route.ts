import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    id: string;
  }
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with the provided email");
        }
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // Add additional user data to token if needed
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        // You can add additional session data here if needed
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // The `url` parameter is the URL that the user would normally be redirected to.
      // The `baseUrl` is the site's base URL.

      // If the callbackUrl from signIn (on signup page) was "/setup",
      // then `url` here would be `baseUrl + "/setup"`.
      if (url.startsWith(baseUrl + "/setup")) {
        return url; // Allow redirection to /setup
      }

      // If it's a relative URL (e.g. from a protected page access attempt)
      // and it's not /setup, let it proceed if it's an internal link.
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      // If it's an absolute URL on the same origin
      if (new URL(url).origin === baseUrl) {
        return url;
      }

      // For any other case (e.g. OAuth without specific callback, or error states redirecting)
      // redirect to a sensible default.
      return baseUrl + "/dashboard";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login", // Error code passed in query string as ?error=
    newUser: "/signup",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
