# CareerLens AI

CareerLens AI is a full-stack AI-powered platform built to help job seekers prepare for specific roles.

The application takes a user's resume and job-related information and uses Google Gemini to analyze the profile, identify relevant skills, generate interview questions, and provide preparation guidance.

## Features

- Resume upload and processing
- AI-powered resume analysis
- Job role / job description analysis
- Resume and job requirement matching
- Skill gap identification
- AI-generated interview questions
- Personalized interview preparation
- ATS-friendly resume generation
- PDF generation
- User authentication and protected routes

## Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios
- Context API
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

### AI & Other Tools
- Google Gemini API
- Zod
- Puppeteer
- Postman

## How It Works

The application follows a simple flow:

```text
Resume / Job Information
          |
          v
      Backend API
          |
          v
      Gemini AI
          |
     +----+----+
     |         |
     v         v
Skill Gap   Interview
Analysis    Questions
     |         |
     +----+----+
          |
          v
   Preparation Report
          |
          v
      PDF / Resume
