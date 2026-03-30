import { NextResponse } from "next/server"
import { db } from "@/utils/db"
import { UserAnswer } from "@/utils/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const { mockId } = await req.json()

    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockId, mockId))

    return NextResponse.json({
      success: true,
      answers: result,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false })
  }
}