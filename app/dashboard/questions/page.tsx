"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type QuestionType = {
  question: string
  answer: string
  mockId: string
  jobPosition: string
  createdAt: string
  index: number
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [search, setSearch] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/get-all-interviews")
      const data = await res.json()

      if (data.success) {
        const allQuestions: QuestionType[] = []

        data.data.forEach((item: any) => {
          try {
            const parsed = JSON.parse(item.jsonMockResp)

            parsed.forEach((q: any, index: number) => {
              allQuestions.push({
                question: q.question,
                answer: q.answer,
                mockId: item.mockId,
                jobPosition: item.jobPosition,
                createdAt: item.createdAt,
                index, // ✅ IMPORTANT
              })
            })
          } catch (err) {
            console.error(err)
          }
        })

        setQuestions(allQuestions)
      }
    }

    fetchData()
  }, [])

  const filtered = questions.filter((q) =>
    q.question.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-10 space-y-6">
      <h2 className="text-2xl font-bold text-purple-600">
        Questions Bank
      </h2>

      <Input
        placeholder="Search questions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.length > 0 ? (
          filtered.map((q, i) => (
            <Card key={i}>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-bold">{q.question}</h3>

                <p className="text-sm text-gray-500">
                  Role: {q.jobPosition}
                </p>

                <div className="flex gap-3">
                  <Button
                    onClick={() =>
                      router.push(
                        `/dashboard/interview/${q.mockId}/start?questionIndex=${q.index}`
                      )
                    }
                  >
                    Practice
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() =>
                      router.push(
                        `/dashboard/interview/${q.mockId}/feedback`
                      )
                    }
                  >
                    Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No questions found</p>
        )}
      </div>
    </div>
  )
}