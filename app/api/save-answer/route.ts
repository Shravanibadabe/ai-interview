import { NextRequest, NextResponse } from "next/server"
import { db } from "@/utils/db"
import { UserAnswer } from "@/utils/schema"
import { eq, and } from "drizzle-orm"

export async function POST(req: NextRequest) {
  try {
    const {
      mockId,
      question,
      correctAnswer,
      userAnswer,
      confidence,
      mlScore,
      feedback,
    } = await req.json()

    // ✅ CHECK EXISTING (PREVENT DUPLICATE)
    const existing = await db
      .select()
      .from(UserAnswer)
      .where(
        and(
          eq(UserAnswer.mockId, mockId),
          eq(UserAnswer.question, question)
        )
      )

    // ✅ FINAL SCORE (COMBINED ML)
    const finalScore = Math.round(
      0.6 * (mlScore || 0) + 
      0.4 * (confidence || 70)
    )

    if (existing.length > 0) {
      await db
        .update(UserAnswer)
        .set({
          userAnswer,
          confidence: Number(confidence || 70),
          mlScore: Number(mlScore || 0),
          feedback,
        })
        .where(eq(UserAnswer.id, existing[0].id))

      return NextResponse.json({ success: true, updated: true })
    }

    await db.insert(UserAnswer).values({
      mockId,
      question,
      correctAnswer,
      userAnswer,
      confidence: Number(confidence || 70),
      mlScore: Number(mlScore || 0),
      feedback,
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false })
  }
}