# CareerLens AI

CareerLens AI is an AI-powered career and interview preparation platform designed to help candidates prepare for job opportunities using their resume, job description, and personal profile.

The platform analyzes a candidate's profile against a job description and generates a personalized interview preparation report using Google Gemini.

---

## 🚀 Features

### 🤖 AI-Powered Interview Preparation

Generate a personalized interview preparation report based on:

- Candidate resume
- Job description
- Self-description

The AI generates:

- Match score
- Technical interview questions
- Behavioral interview questions
- Interviewer intentions
- Suggested answer approaches
- Skill gaps
- Skill-gap severity
- Day-by-day preparation plan
- Target job role/title

---
### Screenshots

  <img width="1917" height="933" alt="image" src="https://github.com/user-attachments/assets/c1943c0a-e1a6-4f90-8793-a49a987f1296" />
  <img width="1917" height="943" alt="image" src="https://github.com/user-attachments/assets/a7625bb5-c09c-41df-b39f-bab53629144a" />
  <img width="1917" height="936" alt="image" src="https://github.com/user-attachments/assets/16f9e40c-c00b-412b-ac8b-7f2b169578d1" />
  <img width="1917" height="936" alt="image" src="https://github.com/user-attachments/assets/1f68b244-21db-42c6-8b5a-ce3a052a350a" />
  <img width="1917" height="937" alt="image" src="https://github.com/user-attachments/assets/f11ed5cb-deae-4042-8f1a-b90728039590" />
  <img width="1917" height="933" alt="image" src="https://github.com/user-attachments/assets/96fcf798-f79c-4304-9f4d-a4df554ba003" />
  


### 📊 Job Match Analysis

CareerLens analyzes the candidate's profile against the job description and provides a match score from 0–100.

The report highlights:

- Relevant skills
- Missing or weak skills
- Areas that require preparation
- Overall job alignment

---

### 🧠 Personalized Interview Questions

Questions are generated based on the specific job rather than using a fixed question bank.

Each question includes:

- Interview question
- Interviewer's intention
- Recommended approach for answering

Questions are divided into:

- Technical Questions
- Behavioral Questions

---

### 📚 Preparation Roadmap

CareerLens generates a structured preparation plan based on the candidate's skill gaps and the requirements of the target role.

The roadmap includes:

- Daily focus areas
- Preparation tasks
- Technical topics
- Interview preparation activities

---

### 📁 Interview History

Users can access previously generated interview reports from their dashboard.

Each previous interview displays:

- Job role
- Match score
- Date generated

Users can open any previous report to view the complete analysis.

---

### 🔐 Authentication

CareerLens includes secure user authentication using:

- JWT
- HTTP-only cookies
- Password hashing with bcrypt
- Protected API routes

Users must be authenticated to access interview preparation features.

---

### 📄 Resume Upload

Candidates can upload their resume in PDF format.

The backend extracts the resume content and uses it as part of the AI analysis.

---

### 📝 Resume Generation & PDF Export

> 🚧 **Planned Feature**

A resume generation feature will be added in a future version.

Planned functionality includes:

- AI-powered resume generation
- Resume customization based on job descriptions
- ATS-friendly resume formatting
- AI-assisted resume improvement
- Resume preview
- PDF export

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- React Router
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Cookie-based authentication
- Multer
- PDF parsing

## AI

- Google Gemini API
- `@google/genai`
- Zod
- Zod JSON Schema

---

# 🏗️ Project Structure

```text
CareerLens/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── context/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── app.js
│   ├── package.json
│   └── .env.example
│
└── README.md
