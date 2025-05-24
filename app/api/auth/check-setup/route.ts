import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email parameter is required" },
        { status: 400 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        hasCompletedSetup: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Return whether the user needs setup
    return NextResponse.json({ needsSetup: !user.hasCompletedSetup });
  } catch (error) {
    console.error("Error checking user setup:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
