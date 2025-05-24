import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get the setup data
    const { displayName, bio, interests, preferences } = await req.json();

    // Update the user with the provided info and mark setup as complete
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: displayName || session.user.name,
        hasCompletedSetup: true,
        // Store additional setup data as needed
        // You could create additional models for user preferences, interests, etc.
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error completing setup:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
