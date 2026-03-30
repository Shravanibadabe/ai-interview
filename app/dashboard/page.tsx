"use client"

import React, { useEffect, useState } from "react"
import AddNewInterview from "./_components/AddNewInterview"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

function Dashboard() {
  const [interviews, setInterviews] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/get-all-interviews")
      const data = await res.json()

      if (data.success) {
        setInterviews(data.data)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-10">

      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">
        Create and start your AI Mockup Interview
      </h2>

      {/* ➕ ADD NEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>

      {/* 📊 PREVIOUS INTERVIEWS */}
      <h2 className="text-xl font-semibold mt-10 mb-5">
        Previous Mock Interview
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {interviews.map((item, index) => (
          <Card key={index} className="border rounded-xl">
            <CardContent className="p-5 space-y-3">

              <h3 className="font-bold text-lg">
                {item.jobPosition}
              </h3>

              <p className="text-sm text-gray-500">
                Experience: {item.jobExperience}
              </p>

              <p className="text-xs text-gray-400">
                Created At: {new Date(item.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-3 mt-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/dashboard/interview/${item.mockId}/feedback`)
                  }
                >
                  Feedback
                </Button>

                <Button
                  className="bg-purple-600 text-white"
                  onClick={() =>
                    router.push(`/dashboard/interview/${item.mockId}`)
                  }
                >
                  Start
                </Button>
              </div>

            </CardContent>
          </Card>
        ))}

      </div>
    </div>
  )
}

export default Dashboard