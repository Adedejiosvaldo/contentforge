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
        company,
        role,
        industry,
        niche,
        audienceDesc,
        keywords,
        bio,
        emailNotifications: preferences?.emailNotifications ?? true,
        contentReminders: preferences?.contentReminders ?? true,
        analyticsReports: preferences?.analyticsReports ?? true,
        hasCompletedSetup: true,
      },
    });

    // Find the user to get the ID
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Clear existing relations before adding new ones
    await prisma.userAudience.deleteMany({ where: { userId: user.id } });
    await prisma.userBrandVoice.deleteMany({ where: { userId: user.id } });
    await prisma.userInterest.deleteMany({ where: { userId: user.id } });

    // Add audience selections
    if (audience && audience.length > 0) {
      await Promise.all(
        audience.map(async (item: string) => {
          await prisma.userAudience.create({
            data: {
              userId: user.id,
              audience: item,
            },
          });
        })
      );
    }

    // Add brand voice selections
    if (brandVoice && brandVoice.length > 0) {
      await Promise.all(
        brandVoice.map(async (voice: string) => {
          await prisma.userBrandVoice.create({
            data: {
              userId: user.id,
              voice,
            },
          });
        })
      );
    }

    // Add interests if available
    if (interests && interests.length > 0) {
      await Promise.all(
        interests.map(async (interest: string) => {
          await prisma.userInterest.create({
            data: {
              userId: user.id,
              interest,
            },
          });
        })
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error completing setup:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
