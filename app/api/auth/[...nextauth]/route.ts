import NextAuth, { NextAuthOptions } from "next-auth";

import { authOptions } from "./authOptions";

// Extend NextAuth types

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
