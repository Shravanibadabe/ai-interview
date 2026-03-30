import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    console.log("👉 Prompt received:", prompt)

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    })

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    })

    console.log("👉 Raw Gemini Response:", response)

    let text = response.text || ""

    text = text.replace(/```json|```/g, "").trim()

    console.log("👉 Cleaned Text:", text)

    return NextResponse.json({ result: text })

  } catch (error: any) {
    console.error("❌ Gemini Error:", error?.message || error)

    return NextResponse.json({
      error: true,
      message: error?.message || "Gemini failed",
    })
  }
}