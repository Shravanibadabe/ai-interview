"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState("")
  const [jobDesc, setJobDesc] = useState("")
  const [jobExperience, setJobExperience] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!jobPosition || !jobDesc || !jobExperience) {
      alert("Fill all fields ❌")
      return
    }

    try {
      setLoading(true)

      const prompt = `
Job Position: ${jobPosition}
Tech Stack: ${jobDesc}
Experience: ${jobExperience}

Generate 5 interview questions with answers in JSON only.
`

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()

      let parsed = []

      try {
        let text = data.result.replace(/```json|```/g, "")
        const match = text.match(/\[[\s\S]*\]/)
        parsed = JSON.parse(match[0])
      } catch {
        parsed = [
          { question: "Explain your project", answer: "Explain clearly" },
          { question: "What is API?", answer: "Communication layer" },
          { question: "What is DB?", answer: "Stores data" },
          { question: "What is React?", answer: "Frontend library" },
          { question: "What is Node?", answer: "Runtime" },
        ]
      }

      const saveRes = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobPosition,
          jobDesc,
          jobExperience,
          jsonMockResp: parsed,
        }),
      })

      const saveData = await saveRes.json()

      if (saveData.mockId) {
        alert("Created ✅")
        setOpenDialog(false)

        router.push(`/dashboard/interview/${saveData.mockId}`)
      }

    } catch (err) {
      console.error(err)
      alert("Error ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary cursor-pointer hover:shadow-lg"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-center font-semibold">+ Add New Interview</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Interview</DialogTitle>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              placeholder="Job Role"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
            />

            <Textarea
              placeholder="Tech Stack"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />

            <Input
              type="number"
              placeholder="Experience"
              value={jobExperience}
              onChange={(e) => setJobExperience(e.target.value)}
            />

            <Button className="w-full">
              {loading ? "Generating..." : "Start Interview"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview