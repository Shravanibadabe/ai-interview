"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function FeedbackPage() {
  const params = useParams()
  const router = useRouter()
  const mockId = params?.mockId as string

  const [answers, setAnswers] = useState<any[]>([])

  useEffect(() => {
    const fetchAnswers = async () => {
      const res = await fetch("/api/get-user-answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mockId }),
      })

      const data = await res.json()
      if (data.success) setAnswers(data.answers)
    }

    if (mockId) fetchAnswers()
  }, [mockId])

  const toNumber = (val: any, fallback = 0) => {
    const num = Number(val)
    return isNaN(num) ? fallback : num
  }

  const calculateFinal = (ml: number, conf: number) => {
    return Math.round(0.7 * ml + 0.3 * conf)
  }

  const avg =
    answers.reduce((sum, a) => {
      const ml = toNumber(a.mlScore, 40)
      const conf = toNumber(a.confidence, 70)
      return sum + calculateFinal(ml, conf)
    }, 0) / (answers.length || 1)

  return (
    <div className="p-10 space-y-6">

      {/* 🔙 BACK BUTTON */}
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => router.push("/dashboard")}
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Button>

      <h1 className="text-3xl font-bold text-purple-600">
        Interview Report
      </h1>

      <h2 className="text-xl font-semibold">
        Overall Score: {Math.round(avg)}%
      </h2>

      {answers.map((ans, i) => {
        const ml = toNumber(ans.mlScore, 40)
        const conf = toNumber(ans.confidence, 70)
        const finalScore = calculateFinal(ml, conf)

        return (
          <div key={i} className="p-5 bg-white shadow rounded">
            <h2 className="font-semibold">{ans.question}</h2>

            <p><b>Your Answer:</b> {ans.userAnswer}</p>
            <p><b>Correct Answer:</b> {ans.correctAnswer}</p>

            <p><b>AI Score:</b> {ml}%</p>
            <p><b>Confidence:</b> {conf}%</p>
            <p><b>Final Score:</b> {finalScore}%</p>

            <p className="text-purple-600 font-bold mt-2">
              {ans.feedback && ans.feedback !== "Evaluation failed"
                ? ans.feedback
                : "Try to give more relevant and structured answers."}
            </p>
          </div>
        )
      })}
    </div>
  )
}