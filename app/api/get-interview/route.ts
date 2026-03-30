import { NextResponse } from "next/server"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const { mockId } = await req.json()

    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, mockId))

    if (!result.length) {
      return NextResponse.json({ success: false })
    }

    return NextResponse.json({
      success: true,
      meta: result[0],
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false })
  }
}