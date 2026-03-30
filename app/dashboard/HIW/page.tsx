"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function HIWPage() {
  const steps = [
    {
      title: "Step 1: Create Interview",
      desc: "Click on 'Add New Interview' in the dashboard to start a new AI mock interview.",
    },
    {
      title: "Step 2: Answer Questions",
      desc: "Answer questions in your own words. AI will evaluate your answers, provide feedback, and correct pronunciation.",
    },
    {
      title: "Step 3: Review Feedback",
      desc: "Go to 'Feedback' in previous interviews to view your corrected answers, AI score, and detailed feedback.",
    },
    {
      title: "Step 4: Improve Skills",
      desc: "Use the AI feedback to improve your answers, knowledge, and fluency for real interviews.",
    },
  ]

  return (
    <div className="p-10 space-y-6">
      <h2 className="text-2xl font-bold text-purple-600">How It Works</h2>
      <p className="text-gray-500">Follow these simple steps to improve your interview skills:</p>

      <div className="grid md:grid-cols-2 gap-6">
        {steps.map((step, i) => (
          <Card key={i} className="border rounded-xl">
            <CardContent className="p-5 space-y-2">
              <h3 className="font-bold text-lg">{step.title}</h3>
              <p className="text-gray-500">{step.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}