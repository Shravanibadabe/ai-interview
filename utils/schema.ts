import { pgTable, serial, text, varchar, timestamp,integer, } from "drizzle-orm/pg-core"


// ✅ Mock Interview Table
export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),

  jobPosition: text("jobPosition"),
  jobDesc: text("jobDesc"),
  jobExperience: varchar("jobExperience", { length: 50 }),

  jsonMockResp: text("jsonMockResp"),

  mockId: varchar("mockId", { length: 255 }),

  // ✅ FIXED: proper timestamp instead of text
  createdAt: timestamp("createdAt").defaultNow(),
})

// ✅ User Answer Table


export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),

  mockId: text("mockId"),
  question: text("question"),

  correctAnswer: text("correctAnswer"),
  userAnswer: text("userAnswer"),

  // ✅ FIXED TYPES
  confidence: integer("confidence"),

  // ✅ NEW (IMPORTANT)
  mlScore: integer("mlScore"),

  // OPTIONAL
  feedback: text("feedback"),

  createdAt: timestamp("createdAt").defaultNow(),
})