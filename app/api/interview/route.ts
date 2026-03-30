import { NextResponse } from "next/server"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const mockId = crypto.randomUUID()

    await db.insert(MockInterview).values({
      jobPosition: body.jobPosition,
      jobDesc: body.jobDesc,
      jobExperience: String(body.jobExperience),

      // ✅ SAVE AS STRING (ONLY ONCE)
      jsonMockResp: JSON.stringify(body.jsonMockResp),

      mockId,
    })

    return NextResponse.json({
      success: true,
      mockId,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false })
  }
}