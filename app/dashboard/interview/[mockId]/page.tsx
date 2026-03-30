"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Lightbulb, Camera } from "lucide-react"

export default function InterviewSetupPage() {
  const { mockId } = useParams()
  const router = useRouter()

  const [data, setData] = useState<any>(null)

  // 🔥 FETCH INTERVIEW DATA
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/get-interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mockId }),
      })

      const result = await res.json()
      if (result.success) {
        setData(result.meta)
      }
    }

    if (mockId) fetchData()
  }, [mockId])

  if (!data) return <p className="p-10">Loading...</p>

  return (
    <div className="min-h-screen bg-gray-50">

      

      {/* MAIN */}
      <div className="p-10 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold mb-8">
          Let's Get Started 🚀
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* DETAILS CARD */}
            <div className="bg-white border rounded-xl p-6 shadow-sm space-y-3">
              <p><b>Job Role:</b> {data.jobPosition}</p>
              <p><b>Tech Stack:</b> {data.jobDesc}</p>
              <p><b>Experience:</b> {data.jobExperience} years</p>
            </div>

            {/* ALERT BOX */}
            <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-5 flex gap-3">
              <Lightbulb className="text-yellow-600 mt-1" />

              <div>
                <h3 className="font-semibold text-yellow-800">
                  Information
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Please enable your webcam and microphone before starting the interview.
                  Your video is only used for real-time analysis and is not stored.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col items-center justify-center">

            <div className="w-full h-[250px] bg-gray-200 rounded-xl flex flex-col items-center justify-center gap-3">
              <Camera size={40} className="text-gray-500" />

              <button className="text-purple-600 font-medium hover:underline">
                Enable Web Cam and Microphone
              </button>
            </div>

          </div>
        </div>

        {/* START BUTTON */}
        <div className="flex justify-end mt-10">
          <Button
  className="bg-purple-600 hover:bg-purple-700 px-6 py-2 text-white"
  onClick={() => {
    const coins = Number(localStorage.getItem("coins") || 20)

    if (coins < 5) {
      alert("❌ Not enough coins. Please upgrade.")
      router.push("/dashboard/upgrade")
      return
    }

    // ✅ Deduct coins
    localStorage.setItem("coins", String(coins - 5))

    router.push(`/dashboard/interview/${mockId}/start`)
  }}
>
  Start Interview (5 coins)
</Button>
        </div>

      </div>
    </div>
  )
}