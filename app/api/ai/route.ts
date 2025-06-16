import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, socialMediaPlatforms } = await request.json(); // Changed to socialMediaPlatforms (plural)

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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key for Google Generative AI not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const generatedPosts: Record<string, string> = {};

    for (const platform of socialMediaPlatforms) {
      const fullPrompt = `Generate a social media post for ${platform} based on the following input: "${prompt}"`;
      try {
        const result = await model.generateContent(fullPrompt);
        const response = result.response;
        const text = response.text();
        generatedPosts[platform] = text;
      } catch (error) {
        console.error(`Error generating content for ${platform}:`, error);
        // Optionally, you could add a specific error message for this platform
        generatedPosts[platform] =
          "Failed to generate content for this platform.";
      }
    }

    return NextResponse.json({ generatedPosts }); // Return a map of posts
  } catch (error) {
    console.error("Error generating AI posts:", error);
    // Ensure this is a general catch for unexpected errors
    if (error instanceof SyntaxError) {
      // For example, if request.json() fails
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
