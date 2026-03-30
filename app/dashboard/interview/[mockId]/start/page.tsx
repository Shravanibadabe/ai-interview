"use client"

import React, { useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import * as faceapi from "face-api.js"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import { useParams, useSearchParams } from "next/navigation" // ✅ ADDED
import { Button } from "@/components/ui/button"
import { Mic, Lightbulb, Volume2 } from "lucide-react"

export default function StartInterview() {
  const webcamRef = useRef<Webcam>(null)
  const params = useParams()
  const searchParams = useSearchParams() // ✅ NEW

  const mockId = params?.mockId as string
  const questionIndexParam = searchParams.get("questionIndex") // ✅ NEW

  const [questions, setQuestions] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const [isRecording, setIsRecording] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [confidence, setConfidence] = useState(70)

  const [finalAnswer, setFinalAnswer] = useState("")

  const { transcript, resetTranscript } = useSpeechRecognition()

  // ✅ KEEP TRANSCRIPT UPDATED
  useEffect(() => {
    if (transcript && transcript.length > 0) {
      setFinalAnswer(transcript)
    }
  }, [transcript])

  // ✅ FETCH QUESTIONS
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/get-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mockId }),
      })

      const data = await res.json()

      if (data.success) {
        const parsed = JSON.parse(data.meta.jsonMockResp)
        setQuestions(parsed)
      }
    }

    if (mockId) fetchData()
  }, [mockId])

  // ✅ 🔥 FIXED: WAIT FOR QUESTIONS THEN SET INDEX
  useEffect(() => {
    if (
      questionIndexParam !== null &&
      questions.length > 0
    ) {
      const index = Number(questionIndexParam)

      if (!isNaN(index) && index < questions.length) {
        setCurrentIndex(index)
      }
    }
  }, [questionIndexParam, questions])

  // FACE MODEL
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models")
      await faceapi.nets.faceExpressionNet.loadFromUri("/models")
    }
    loadModels()
  }, [])

  const detectConfidence = async () => {
    if (!webcamRef.current?.video) return

    const res = await faceapi
      .detectSingleFace(
        webcamRef.current.video!,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceExpressions()

    if (res?.expressions) {
      const e = res.expressions
      const score = (e.happy + e.neutral + (1 - e.fearful)) / 3
      setConfidence(Math.round(score * 100))
    }
  }

  useEffect(() => {
    const interval = setInterval(detectConfidence, 2000)
    return () => clearInterval(interval)
  }, [])

  // 🎤 START
  const start = () => {
    setIsRecording(true)
    setFinalAnswer("")
    resetTranscript()

    SpeechRecognition.startListening({
      continuous: true,
      interimResults: true,
      language: "en-IN",
    })
  }

  // 🛑 STOP
  const stop = () => {
    setIsRecording(false)
    SpeechRecognition.stopListening()
  }

  // 🔊 SPEAK
  const speakQuestion = () => {
    const text = questions[currentIndex]?.question
    if (!text) return

    const speech = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(speech)
  }

  // ✅ SAVE ANSWER (UNCHANGED)
  const saveAnswer = async () => {
    let answer = finalAnswer.trim()

    console.log("🎤 USER SPOKEN:", answer)

    if (!answer || answer.length < 3) {
      alert("Please record answer first ❌")
      return false
    }

    const currentQ = questions[currentIndex]

    setIsSaving(true)

    try {
      const evalRes = await fetch("/api/evaluate-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentQ.question,
          userAnswer: answer,
          correctAnswer: currentQ.answer,
        }),
      })

      const evalData = await evalRes.json()

      let finalText = answer

      if (
        evalData.correctedAnswer &&
        evalData.correctedAnswer.length > 3 &&
        evalData.correctedAnswer !== currentQ.answer
      ) {
        finalText = evalData.correctedAnswer
      }

      const res = await fetch("/api/save-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mockId,
          question: currentQ.question,
          correctAnswer: currentQ.answer,
          userAnswer: finalText,
          confidence,
          mlScore: evalData.score,
          feedback: evalData.feedback,
        }),
      })

      const data = await res.json()

      if (!data.success) {
        alert("Save failed ❌")
        return false
      }

      return true
    } catch (err) {
      console.error(err)
      return false
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      {/* QUESTIONS */}
      <div className="flex flex-wrap gap-3 mb-8">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`px-4 py-2 rounded-full ${
              i === currentIndex
                ? "bg-purple-600 text-white"
                : "bg-white border"
            }`}
          >
            Question #{i + 1}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold">
              {questions[currentIndex]?.question}
            </h2>

            <Volume2
              onClick={speakQuestion}
              className="mt-3 cursor-pointer text-gray-500"
            />
          </div>

          <div className="mt-10 bg-blue-50 border p-5 rounded-xl flex gap-3">
            <Lightbulb className="text-purple-600" />
            <div>
              <p className="font-semibold text-purple-700">Note:</p>
              <p className="text-sm text-gray-600">
                Speak clearly and confidently.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center">

          <div className="w-full h-[300px] bg-black rounded-xl overflow-hidden">
            <Webcam ref={webcamRef} className="w-full h-full" />
          </div>

          <Button
            variant="outline"
            className="mt-6 border-purple-600 text-purple-600"
            onClick={() => {
              if (isRecording) stop()
              else start()
            }}
            disabled={isSaving}
          >
            <Mic className="mr-2" />
            {isRecording ? "Stop Recording" : "Record Answer"}
          </Button>

          <div className="flex gap-4 mt-10 w-full justify-end">

            <Button
              className="bg-purple-600"
              onClick={() =>
                setCurrentIndex((p) => Math.max(p - 1, 0))
              }
            >
              Previous
            </Button>

            <Button
              className="bg-purple-600"
              onClick={async () => {
                if (isSaving) return

                const saved = await saveAnswer()
                if (!saved) return

                setFinalAnswer("")
                resetTranscript()

                if (currentIndex < questions.length - 1) {
                  setCurrentIndex((p) => p + 1)
                } else {
                  window.location.href = `/dashboard/interview/${mockId}/feedback`
                }
              }}
            >
              Next
            </Button>

          </div>
        </div>
      </div>
    </div>
  )
}