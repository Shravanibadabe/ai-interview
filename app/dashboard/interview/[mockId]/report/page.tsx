"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function ReportPage() {
  const { mockId } = useParams()
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/get-feedback")
      const json = await res.json()
      const filtered = json.filter((i: any) => i.mockId === mockId)
      setData(filtered)
    }
    fetchData()
  }, [mockId])

  const avg =
    data.reduce((sum, i) => sum + Number(i.rating || 0), 0) / (data.length || 1)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Final Report</h1>

      <p className="mt-4">⭐ Average Score: {avg.toFixed(2)}</p>

      <div className="mt-6 space-y-4">
        {data.map((item, i) => (
          <div key={i} className="border p-4 rounded">
            <p><b>Q:</b> {item.question}</p>
            <p className="text-green-600"><b>AI Expected:</b> {item.correctAnswer}</p>
            <p className="text-blue-600"><b>Your Answer:</b> {item.userAnswer}</p>
            <p><b>Score:</b> {item.rating}</p>
            <p><b>Feedback:</b> {item.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  )
}