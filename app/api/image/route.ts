import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    // check user is logged in
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // check openai api key is configured
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API not configured", { status: 500 });
    }

    // check message is valid
    if (!prompt) {
      return new NextResponse("Invalid prompt", { status: 400 });
    }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    return NextResponse.json(response.data);
  } catch (e) {
    console.log("[IMAGE ERROR]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
