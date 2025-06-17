import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/app/prisma"; // Corrected prisma import
import { authOptions } from "../auth/[...nextauth]/authOptions";

// Define a type for the user interest if not already defined elsewhere
interface UserInterest {
  interest: string;
  // Add other properties of UserInterest if any
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Assuming you have extended the Session type in a .d.ts file to include user.id
    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = (session.user as any).id as string; // Type assertion for id

    const { prompt, socialMediaPlatforms } = await request.json();

    if (
      !prompt ||
      !socialMediaPlatforms ||
      !Array.isArray(socialMediaPlatforms) ||
      socialMediaPlatforms.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Missing prompt or socialMediaPlatforms (must be a non-empty array) in request body",
        },
        { status: 400 }
      );
    }

    // Fetch user details from Prisma
    const userDetails = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        interests: true, // Assuming you have a relation named 'interests'
      },
    });

    if (!userDetails) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const {
      company,
      role,
      industry,
      niche,
      audienceDesc,
      keywords,
      bio,
      interests: userInterestsDb,
    } = userDetails;
    const interests =
      userInterestsDb?.map((i: UserInterest) => i.interest).join(", ") ||
      "general topics";

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key for Google Generative AI not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const generatedPosts: Record<string, string> = {};

    for (const platform of socialMediaPlatforms) {
      // Construct the detailed prompt
      let detailedPrompt = `You are an expert social media content creator with decades of experience writing compelling posts that has garnered hundreds of thousands of likes.
      Your task is to generate a compelling post for the ${platform} platform based on the following input: "${prompt}".

      Consider the following user profile for tone, style, and content:
      - Company: ${company || "Not specified"}
      - Role: ${role || "Not specified"}
      - Industry: ${industry || "Not specified"}
      - Niche: ${niche || "Not specified"}
      - Target Audience: ${audienceDesc || "General audience"}
      - Key Keywords to consider: ${keywords || "Not specified"}
      - User Bio/Brand Voice: ${bio || "Professional and engaging"}
      - User Interests: ${interests}

      The post MUST:
      1. Be highly engaging and optimized to gain traction and likes.
      2. Sound human, authentic, and relatable to the target audience.
      3. Include relevant and effective hashtags to maximize reach.
      4. Be tailored specifically for the ${platform} platform, considering its best practices (e.g., character limits for Twitter, visual focus for Instagram).
      5. Be formatted with appropriate paragraph breaks and line breaks for excellent readability. Use new lines for new paragraphs or distinct ideas.
      6. Contain ONLY the social media post content itself. Do NOT include any introductory phrases, explanations, or Markdown formatting (e.g., no ---, #, *, _, **). Specifically, do not use asterisks or underscores for bolding or italics.
      7. Use keywords naturally within the post to enhance discoverability.
      8. You can chose to be creative with emojis, but use them sparingly and only if they fit the platform's tone.
      9. Optionally choose to include a call to action (CTA) if it fits the context of the post.
      10. Be concise and to the point, avoiding unnecessary fluff or filler content.
      11. Add humor or wit if it fits the context and platform, but ensure it aligns with the brand voice.


      Generate ONLY the post content now:
      `;

      try {
        const result = await model.generateContent(detailedPrompt);
        const response = result.response;
        const text = response.text();
        generatedPosts[platform] = text;
      } catch (error) {
        console.error(`Error generating content for ${platform}:`, error);
        generatedPosts[platform] =
          "Failed to generate content for this platform.";
      }
    }

    return NextResponse.json({ generatedPosts });
  } catch (error) {
    console.error("Error generating AI posts:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to generate AI posts" },
      { status: 500 }
    );
  }
}
