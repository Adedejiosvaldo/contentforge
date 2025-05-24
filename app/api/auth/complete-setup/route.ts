import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get the setup data
    const {
      displayName,
      company,
      role,
      industry,
      niche,
      audience,
      audienceDesc,
      brandVoice,
      keywords,
      bio,
      interests,
      preferences,
    } = await req.json();

    console.log("Setup data received:", {
      displayName,
      industry,
      audience,
      brandVoice,
      keywords,
    });

    // Update the user with the provided info and mark setup as complete
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: displayName || session.user.name,
        hasCompletedSetup: true,
        // Store additional setup data as needed
        // In a real app, you might want to store these in separate tables with relationships
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error completing setup:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
