# 🎤 AI Interview Mocker

[![Live Demo](https://img.shields.io/badge/Live-Demo-purple?style=for-the-badge)](https://ai-interview-black-one.vercel.app/dashboard)

An AI-powered mock interview platform that simulates real interview scenarios using Artificial Intelligence, Voice Recognition, Facial Expression Analysis, and Automated Feedback Generation.

---

## 🌐 Live Demo

🚀 **Try the Application**

https://ai-interview-black-one.vercel.app/dashboard

### Demo Access

* Sign up using your email account
* New users receive **20 free coins**
* Each interview attempt costs **5 coins**
* Complete interviews and receive AI-generated feedback

---

## 🚀 Overview

AI Interview Mocker is designed to help students, freshers, and job seekers improve their interview performance through realistic AI-powered mock interviews.

The platform generates interview questions using AI, records spoken answers, analyzes facial expressions through webcam input, and provides detailed feedback with performance scores.

---

## ✨ Features

### 🤖 AI-Powered Question Generation

* Generates interview questions based on selected job role and experience level
* Dynamic question creation using Gemini AI

### 🎤 Voice-Based Answer Recording

* Users answer questions verbally
* Speech converted to text using Web Speech API

### 📸 Facial Confidence Analysis

* Real-time webcam monitoring
* Face detection using Face API
* Confidence estimation through facial expressions

### 📊 Intelligent Evaluation

* AI evaluates user responses
* Generates scores and constructive feedback
* Suggests improvements for better interview performance

### 💰 Coin-Based Interview System

* New users receive 20 coins
* Every interview attempt costs 5 coins
* Upgrade system for additional interview attempts

### 🔐 Secure Authentication

* User authentication and management using Clerk
* Secure login and registration

### 📁 Interview History

* Stores previous interviews
* Allows users to review past performance
* Access feedback anytime

---

## 🛠️ Tech Stack

### Frontend

* Next.js 15 (App Router)
* React.js
* TypeScript
* Tailwind CSS
* ShadCN UI

### Backend

* Next.js API Routes
* Server Actions

### Database

* Neon Database
* PostgreSQL
* Drizzle ORM

### Artificial Intelligence

* Gemini AI API
* Face API
* Web Speech API

### Authentication

* Clerk Authentication

### Deployment

* Vercel

---

## 🧠 System Workflow

### Step 1

User logs into the platform using Clerk Authentication.

### Step 2

User creates a new interview by entering:

* Job Role
* Job Description
* Years of Experience

### Step 3

Gemini AI generates interview questions based on provided details.

### Step 4

User starts the interview.

### Step 5

The system:

* Records voice responses
* Converts speech to text
* Tracks facial expressions

### Step 6

Gemini AI evaluates the answer and generates:

* Score
* Feedback
* Suggestions

### Step 7

Interview results are stored in Neon PostgreSQL Database.

### Step 8

User can review feedback and previous interview history.

---

## 💡 Key Innovation

This project combines multiple technologies into a single interview preparation platform:

* Artificial Intelligence
* Voice Recognition
* Facial Expression Analysis
* Automated Evaluation
* Real-Time Feedback

Unlike traditional interview preparation tools, the platform evaluates both:

### Technical Performance

* Answer Quality
* Relevance
* Completeness

### Soft Skills

* Confidence
* Facial Expressions
* Communication Effectiveness

---

## 📸 Application Screens

### Dashboard

* Create Interview
* View Previous Interviews

### Interview Setup

* Job Information
* Interview Instructions

### Live Interview

* Webcam Monitoring
* Voice Recording
* AI Question Display

### Feedback Page

* Score Analysis
* AI Suggestions
* Performance Review

### Upgrade Page

* Coin Management
* Premium Features

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/Shravanibadabe/ai-interview.git
```

Navigate to project folder:

```bash
cd ai-interview
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 🔑 Environment Variables

Create a `.env` file and add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

DATABASE_URL=your_neon_database_url

GEMINI_API_KEY=your_gemini_api_key
```

---

## 🗄️ Database Schema

### User Table

```sql
id
clerkId
coins
createdAt
```

### Mock Interview Table

```sql
mockId
jobPosition
jobDesc
jobExperience
jsonMockResp
createdAt
```

### User Answer Table

```sql
mockId
question
correctAnswer
userAnswer
confidence
mlScore
feedback
createdAt
```

---

## 💰 Coin System

| Action                | Coins  |
| --------------------- | ------ |
| New User Registration | +20    |
| Start Interview       | -5     |
| Upgrade Plan          | +Coins |

---

## 🎯 Project Objectives

* Improve interview preparation
* Build confidence in candidates
* Provide realistic interview simulation
* Deliver instant AI-based feedback
* Help students prepare for placements

---

## 🔮 Future Enhancements

* Razorpay Payment Integration
* Resume-Based Question Generation
* Advanced Emotion Recognition
* Detailed Analytics Dashboard
* Multi-Language Support
* Interview Recording Playback
* AI Career Guidance

---

## 📌 Target Users

### Students

Practice placement interviews before campus recruitment.

### Freshers

Improve confidence and communication skills.

### Job Seekers

Prepare for technical and HR interviews.

### Educational Institutions

Conduct mock interview training sessions.

---

## 👨‍💻 Author

### Shravani Badabe

📧 Email:
[badabeshravani@gmail.com](mailto:badabeshravani@gmail.com)

🔗 GitHub:
https://github.com/Shravanibadabe

💼 LinkedIn:
https://linkedin.com/in/shravani-badabe

🌐 Portfolio:
https://shravanibadabe.netlify.app

🚀 Live Demo:
https://ai-interview-black-one.vercel.app/dashboard

---

## 📜 License

This project is developed for educational and learning purposes.

---

### ⭐ If you found this project useful, consider giving it a star on GitHub.
