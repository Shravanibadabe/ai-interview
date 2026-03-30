import { NextResponse } from "next/server"
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"

export async function GET() {
  try {
    const data = await db.select().from(MockInterview)

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
    })
  }
}