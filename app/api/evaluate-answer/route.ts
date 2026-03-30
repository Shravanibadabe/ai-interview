import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { question, userAnswer, correctAnswer } = await req.json()

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    })

    const prompt = `
You are a professional technical interviewer.

Your job is to evaluate a candidate's spoken answer.

IMPORTANT:

1. The answer comes from speech-to-text, so:
   - It may contain wrong words (e.g., "romatic" instead of "semantic")
   - Fix it using CONTEXT of question and correct answer

2. DO NOT copy the correct answer.
3. DO NOT rewrite fully.
4. ONLY fix pronunciation + grammar.

---

FEEDBACK STYLE (VERY IMPORTANT):

- Sound like a HUMAN interviewer
- Be polite and constructive
- DO NOT sound robotic
- DO NOT repeat same sentence every time

Examples:

Bad ❌:
"Answer is incorrect"

Good ✅:
"You’re on the right track, but you missed explaining the key structure like <head> and <body>."

---

SCORING RULES:

- Never give 0
- Minimum score = 30

- Irrelevant → 30–40
- Partial → 40–60
- Good → 60–80
- Excellent → 80–100

---

RETURN STRICT JSON ONLY:

{
  "correctedAnswer": "string",
  "score": number,
  "fluency": number,
  "feedback": "natural human-like feedback"
}

---

Question: ${question}
User Answer: ${userAnswer}
Correct Answer: ${correctAnswer}
`

    const result = await model.generateContent(prompt)
    let text = result.response.text()

    // ✅ CLEAN RESPONSE
    text = text.replace(/```json/g, "").replace(/```/g, "").trim()

    const start = text.indexOf("{")
    const end = text.lastIndexOf("}")

    let jsonString = text
    if (start !== -1 && end !== -1) {
      jsonString = text.substring(start, end + 1)
    }

    let parsed

    try {
      parsed = JSON.parse(jsonString)
    } catch {
      return NextResponse.json({
        correctedAnswer: userAnswer, // fallback = YOUR answer
        score: 30,
        fluency: 60,
        feedback: "Could not evaluate properly",
      })
    }

    return NextResponse.json({
      correctedAnswer: parsed.correctedAnswer || userAnswer,
      score: Number(parsed.score) || 0,
      fluency: Number(parsed.fluency) || 0,
      feedback: parsed.feedback || "No feedback",
    })

  } catch (err) {
    console.error(err)

    return NextResponse.json({
      correctedAnswer: "",
      score: 0,
      fluency: 0,
      feedback: "Evaluation failed",
    })
  }
}