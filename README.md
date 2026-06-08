
# 🎤 AI Interview Mocker

An AI-powered mock interview platform that simulates real interview scenarios using voice, facial expression analysis, and intelligent feedback.

---

## 🚀 Overview

AI Interview Mocker helps users practice interviews by:
- Generating interview questions using AI
- Recording voice answers
- Analyzing facial expressions via webcam
- Providing AI-based feedback and scoring

It improves both **technical knowledge** and **confidence skills**.

---

## ✨ Features

- 🤖 AI-generated interview questions (Gemini API)
- 🎤 Voice-based answer recording (Speech Recognition)
- 📸 Real-time face analysis (confidence detection)
- 📊 AI evaluation with score & feedback
- 💰 Coin-based system for interview attempts
- 🔐 Authentication using Clerk
- 📁 Previous interview tracking & feedback history

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- React.js
- Tailwind CSS
- ShadCN UI

### Backend
- Next.js API Routes
- Gemini AI API (for questions & evaluation)

### Database
- Neon Database (PostgreSQL)
- Drizzle ORM

### AI & ML
- face-api.js (facial expression detection)
- react-speech-recognition (voice input)

### Authentication
- Clerk

---

## 🧠 How It Works

1. User logs in using Clerk authentication  
2. Creates a mock interview  
3. AI generates questions using Gemini API  
4. User answers using voice  
5. Webcam analyzes facial expressions  
6. AI evaluates answers and gives:
   - Score
   - Feedback
   - Confidence level  
7. Results are saved and displayed in dashboard  

---

## 💡 Key Innovation

- Combines **AI + ML + Voice + Facial Analysis**
- Evaluates both:
  - Technical answers
  - Non-verbal communication (confidence)

---

## 📸 Screens

- Dashboard (Interview list)
- Interview Setup Page
- Live Interview (Webcam + Voice)
- Feedback Page (Score + AI Feedback)
- Upgrade Page (Coin System)

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/ai-interview-mocker.git
cd ai-interview-mocker
npm install
npm run dev
````

---

## 🔑 Environment Variables

Create a `.env` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_secret_key
DATABASE_URL=your_neon_database_url
GEMINI_API_KEY=your_gemini_key
```

---

## 🗄️ Database Schema

```sql
User:
- id
- clerkId
- coins

MockInterview:
- mockId
- jobPosition
- jobDesc
- jobExperience
- jsonMockResp

UserAnswer:
- mockId
- question
- correctAnswer
- userAnswer
- confidence
- mlScore
- feedback
```

---

## 💰 Coin System

* New users get **20 coins**
* Each interview costs **5 coins**
* Users can upgrade coins (demo version uses local storage / manual update)

---

## 🔮 Future Enhancements

* Real payment integration (Razorpay)
* Advanced emotion detection
* Resume-based question generation
* Performance analytics dashboard

---

## 📌 Use Case

* Students preparing for placements
* Job seekers improving interview skills
* Colleges for mock interview practice

---

## 👨‍💻 Author

Developed by:

* **Shravani Badabe**

---

## 📜 License

This project is for educational purposes.

---

```
