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
    const { messages } = body;

    // check user is logged in
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // check openai api key is configured
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API not configured", { status: 500 });
    }

    // check message is valid
    if (!messages) {
      return new NextResponse("Invalid message", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    return NextResponse.json(response.choices[0].message);
  } catch (e) {
    console.log("[CONVERSATION ERROR]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
