import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Get the user session
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Check if user has completed setup
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        hasCompletedSetup: true,
      },
    });

    // If user doesn't exist or hasn't completed setup, redirect to setup
    if (!user || !user.hasCompletedSetup) {
      return NextResponse.redirect(new URL("/setup", req.url));
    }

    // Otherwise, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (error) {
    console.error("Error handling OAuth login:", error);
    return NextResponse.redirect(new URL("/login?error=OAuthError", req.url));
  }
}
