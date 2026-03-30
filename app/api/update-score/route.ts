import { NextResponse } from "next/server"
import { db } from "@/utils/db"
import { UserAnswer } from "@/utils/schema"
import { eq, and } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const { mockId, question, mlScore } = await req.json()

    await db
      .update(UserAnswer)
      .set({ mlScore })
      .where(
        and(
          eq(UserAnswer.mockId, mockId),
          eq(UserAnswer.question, question)
        )
      )

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ success: false })
  }
}