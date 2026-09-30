import { GoogleGenAI } from "@google/genai";
import * as z from "zod";
import {zodToJsonSchema} from "zod-to-json-schema"

// console.log("KEY IN GEMINI FILE:", !!process.env.GEMINI_API_KEY);
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    role: z.string().describe(
  "The primary job role or job title mentioned in the job description, such as Software Engineer, Backend Developer, Data Analyst, etc."
),
})

export async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
You are an AI interview preparation assistant.

Analyze the candidate's resume, self-description, and job description.

Generate an interview preparation report containing:

- matchScore: 0-100 score representing how well the candidate matches the job.
- technicalQuestions: likely technical interview questions, their intention, and how the candidate should answer.
- behavioralQuestions: likely behavioral interview questions, their intention, and how the candidate should answer.
- skillGaps: skills required by the job that the candidate lacks or has limited evidence of.
- preparationPlan: a day-by-day preparation plan.
- - role: Extract the primary job title or role directly from the job description.
  Examples include "Software Engineer", "Backend Developer", "Data Analyst",
  "Frontend Developer", etc.
  Do not invent a role. If the job description contains a specific title,
  use that title as written or a concise equivalent.

Candidate Resume:
${resume}

Candidate Self-Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",

    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "OBJECT",

        properties: {
          matchScore: {
            type: "NUMBER",
          },

          technicalQuestions: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                question: {
                  type: "STRING",
                },
                intention: {
                  type: "STRING",
                },
                answer: {
                  type: "STRING",
                },
              },
              required: ["question", "intention", "answer"],
            },
          },

          behavioralQuestions: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                question: {
                  type: "STRING",
                },
                intention: {
                  type: "STRING",
                },
                answer: {
                  type: "STRING",
                },
              },
              required: ["question", "intention", "answer"],
            },
          },

          skillGaps: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                skill: {
                  type: "STRING",
                },
                severity: {
                  type: "STRING",
                  enum: ["low", "medium", "high"],
                },
              },
              required: ["skill", "severity"],
            },
          },

          preparationPlan: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                day: {
                  type: "NUMBER",
                },
                focus: {
                  type: "STRING",
                },
                tasks: {
                  type: "ARRAY",
                  items: {
                    type: "STRING",
                  },
                },
              },
              required: ["day", "focus", "tasks"],
            },
          },

          role: {
            type: "STRING",
          },
        },

        required: [
          "matchScore",
          "technicalQuestions",
          "behavioralQuestions",
          "skillGaps",
          "preparationPlan",
          "role",
        ],
      },
    },
  });

  const output = JSON.parse(response.text);

  console.log("AI OUTPUT:", output);

  // Validate the actual AI response
  const validatedOutput = interviewReportSchema.parse(output);

  return validatedOutput;
}


// export async function invokeGemini() {
//   const response = await ai.models.generateContent({
//     model: "gemini-3.5-flash",
//     contents: "Hello Gemini! Explain what an interview is.",
//   });

//   console.log(response.text);
// }
